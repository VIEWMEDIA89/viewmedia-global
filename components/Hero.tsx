'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Locale } from '@/locales/translations';

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

export default function Hero() {
  const { t, locale, setLocale } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  const currentLang = languages.find(lang => lang.code === locale);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-purple-600 to-secondary overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLanguages(!showLanguages)}
            className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-white/30 transition"
          >
            <span className="text-2xl">{currentLang?.flag}</span>
            <span className="font-medium">{currentLang?.name}</span>
            <span className="text-sm">▼</span>
          </motion.button>

          {showLanguages && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto w-48"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code);
                    setShowLanguages(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition flex items-center gap-3 ${
                    locale === lang.code ? 'bg-blue-100 font-bold' : ''
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Company Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            VIEW-MEDIA
          </motion.h1>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {t('hero.title')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-white text-primary font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all"
          >
            {t('hero.cta')} →
          </motion.a>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/70 text-sm"
            >
              <div className="mb-2">↓</div>
              {t('hero.scroll')}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation - Hidden initially, shows on scroll */}
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute top-0 left-0 right-0 p-6 z-40"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-2xl"
          >
            VIEW-MEDIA
          </motion.div>

          <div className="hidden md:flex gap-6">
            {['services', 'portfolio', 'about', 'contact'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                href={`#${item === 'about' ? 'about' : item}`}
                className="text-white font-medium hover:text-yellow-300 transition"
              >
                {t(`nav.${item}`)}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>
    </section>
  );
}
