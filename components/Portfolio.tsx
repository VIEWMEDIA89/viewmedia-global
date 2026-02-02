'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const portfolioItems = [
  {
    key: 'conference',
    image: '/images/portfolio/conference.jpg', // 로컬 이미지로 변경
  },
  {
    key: 'concert',
    image: '/images/portfolio/concert.jpg',
  },
  {
    key: 'corporate',
    image: '/images/portfolio/corporate.jpg',
  },
  {
    key: 'exhibition',
    image: '/images/portfolio/exhibition.jpg',
  },
  {
    key: 'musical',
    image: '/images/portfolio/musical.jpg',
  },
  {
    key: 'festival',
    image: '/images/portfolio/festival.jpg',
  },
];

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t('portfolio.title')}</h2>
          <p className="text-gray-400">{t('portfolio.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative overflow-hidden rounded-xl shadow-2xl cursor-pointer group"
            >
              <img
                src={item.image}
                alt={t(`portfolio.${item.key}.title`)}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold mb-2">{t(`portfolio.${item.key}.title`)}</h3>
                <p className="text-gray-300 text-sm">{t(`portfolio.${item.key}.desc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
