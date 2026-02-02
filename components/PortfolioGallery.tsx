'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { portfolioAPI, categoryAPI, type Portfolio, type Category } from '@/lib/supabase';

export default function PortfolioGallery() {
  const { t, locale } = useTranslation();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 카테고리 로드
  useEffect(() => {
    loadCategories();
  }, []);

  // 포트폴리오 로드
  useEffect(() => {
    loadPortfolios(true);
  }, [activeCategory, searchQuery]);

  // 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPortfolios(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  const loadCategories = async () => {
    try {
      const data = await categoryAPI.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadPortfolios = async (reset: boolean) => {
    if (loading) return;
    
    setLoading(true);
    const currentPage = reset ? 1 : page + 1;

    try {
      const result = await portfolioAPI.getAll({
        category: activeCategory,
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined
      });

      if (reset) {
        setPortfolios(result.data);
      } else {
        setPortfolios((prev) => [...prev, ...result.data]);
      }

      setHasMore(result.hasMore);
      setPage(currentPage);
    } catch (error) {
      console.error('Failed to load portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1);
    setHasMore(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
  };

  const getCategoryName = (category: Category) => {
    switch (locale) {
      case 'ko': return category.name_ko;
      case 'ja': return category.name_ja;
      default: return category.name_en;
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t('portfolio.title')}</h2>
          <p className="text-gray-400">{t('portfolio.subtitle')}</p>
          <p className="text-primary text-2xl mt-2">200+ Projects Completed</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects, clients, or tags..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All ({portfolios.length}+)
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.slug
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.icon} {getCategoryName(category)} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {portfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedPortfolio(portfolio)}
                className="relative overflow-hidden rounded-xl shadow-2xl cursor-pointer group"
              >
                <img
                  src={portfolio.thumbnail_url || portfolio.image_url}
                  alt={portfolio.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4">
                  <div className="text-xs text-primary mb-1">{portfolio.category}</div>
                  <h3 className="text-lg font-bold mb-1 line-clamp-1">{portfolio.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{portfolio.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>📅 {new Date(portfolio.event_date).toLocaleDateString()}</span>
                    <span>👁️ {portfolio.views}</span>
                  </div>
                </div>
                {portfolio.featured && (
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading more projects...</p>
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={observerTarget} className="h-20"></div>

        {/* No More Results */}
        {!hasMore && portfolios.length > 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl">✅ You've seen all {portfolios.length} projects!</p>
          </div>
        )}

        {/* No Results */}
        {!loading && portfolios.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl text-gray-400">No projects found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPortfolio && (
          <PortfolioModal
            portfolio={selectedPortfolio}
            onClose={() => setSelectedPortfolio(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Portfolio Detail Modal
function PortfolioModal({ portfolio, onClose }: { portfolio: Portfolio; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={portfolio.image_url}
          alt={portfolio.title}
          className="w-full h-96 object-cover"
        />

        {/* Content */}
        <div className="p-8">
          <div className="text-sm text-primary mb-2">{portfolio.category}</div>
          <h2 className="text-3xl font-bold mb-4 text-dark">{portfolio.title}</h2>
          <p className="text-gray-600 mb-6">{portfolio.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-500">Client</div>
              <div className="font-bold text-dark">{portfolio.client_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-bold text-dark">{portfolio.location}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Event Date</div>
              <div className="font-bold text-dark">
                {new Date(portfolio.event_date).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Views</div>
              <div className="font-bold text-dark">{portfolio.views}</div>
            </div>
          </div>

          {/* Tags */}
          {portfolio.tags && portfolio.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {portfolio.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
