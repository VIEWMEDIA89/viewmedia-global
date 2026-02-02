'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';

// SNS 계정 정보 (실제 계정으로 수정 필요)
const SNS_ACCOUNTS = {
  instagram: 'viewmedia_official',
  youtube: 'UCxxxxxxxxxxx', // YouTube Channel ID
  blog: 'https://blog.view-media.kr'
};

export default function SocialFeed() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'instagram' | 'youtube' | 'blog'>('instagram');

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t('social.title')}</h2>
          <p className="text-gray-600">{t('social.subtitle')}</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { key: 'instagram', icon: '📸', label: 'Instagram' },
            { key: 'youtube', icon: '🎬', label: 'YouTube' },
            { key: 'blog', icon: '📝', label: 'Blog' }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {activeTab === 'instagram' && <InstagramFeed />}
          {activeTab === 'youtube' && <YouTubeFeed />}
          {activeTab === 'blog' && <BlogFeed />}
        </motion.div>

        {/* Follow Us Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href={
              activeTab === 'instagram'
                ? `https://instagram.com/${SNS_ACCOUNTS.instagram}`
                : activeTab === 'youtube'
                ? `https://youtube.com/channel/${SNS_ACCOUNTS.youtube}`
                : SNS_ACCOUNTS.blog
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            {activeTab === 'instagram' && '📸 Follow us on Instagram →'}
            {activeTab === 'youtube' && '🎬 Subscribe to YouTube →'}
            {activeTab === 'blog' && '📝 Visit our Blog →'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Instagram Feed Component
function InstagramFeed() {
  return (
    <div>
      {/* Instagram Embed Widget */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Latest Instagram Posts</h3>
          <p className="text-gray-600">Follow us for behind-the-scenes and event highlights</p>
        </div>

        {/* Instagram Embed Script */}
        {/* 실제 배포 시 Instagram API 또는 EmbedSocial 사용 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-md cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-30">📸</span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold">View Post →</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram 실제 연동 방법 안내 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong>💡 실제 연동 방법:</strong>
            <br />
            1. <a href="https://embedsocial.com" className="text-primary underline" target="_blank" rel="noopener">EmbedSocial</a> 또는 <a href="https://www.juicer.io" className="text-primary underline" target="_blank" rel="noopener">Juicer</a> 사용
            <br />
            2. Instagram Business API 연동
            <br />
            3. 위젯 코드를 이 영역에 삽입
          </p>
        </div>
      </div>
    </div>
  );
}

// YouTube Feed Component
function YouTubeFeed() {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Latest YouTube Videos</h3>
          <p className="text-gray-600">Watch our event highlights and behind-the-scenes</p>
        </div>

        {/* YouTube Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-100 rounded-xl overflow-hidden shadow-md cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                <span className="text-6xl">🎬</span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-2">Video Title {i}</h4>
                <p className="text-gray-600 text-sm">View count • Upload date</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube 실제 연동 방법 */}
        <div className="mt-8 p-6 bg-red-50 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong>💡 실제 연동 방법:</strong>
            <br />
            1. YouTube Data API v3 사용
            <br />
            2. <code className="bg-white px-2 py-1 rounded">channelId</code>로 최신 영상 불러오기
            <br />
            3. 또는 YouTube Embed로 재생목록 표시
          </p>
        </div>
      </div>
    </div>
  );
}

// Blog Feed Component
function BlogFeed() {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Latest Blog Posts</h3>
          <p className="text-gray-600">Industry insights and event case studies</p>
        </div>

        {/* Blog Post List */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="flex gap-6 p-6 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-2">Blog Post Title {i}</h4>
                <p className="text-gray-600 mb-3">
                  This is a sample blog post excerpt. Learn about our latest projects and industry insights...
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📅 2026-02-0{i}</span>
                  <span>👁️ 1,234 views</span>
                  <span className="text-primary font-medium">Read More →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog 실제 연동 방법 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong>💡 실제 연동 방법:</strong>
            <br />
            1. WordPress: REST API 사용
            <br />
            2. Tistory/네이버 블로그: RSS Feed 파싱
            <br />
            3. Notion: Notion API 연동
            <br />
            4. 자체 블로그: Next.js API Routes로 데이터 제공
          </p>
        </div>
      </div>
    </div>
  );
}
