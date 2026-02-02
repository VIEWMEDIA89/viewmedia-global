'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const features = [
  {
    icon: '👥',
    key: 'team',
  },
  {
    icon: '⭐',
    key: 'experience',
  },
  {
    icon: '🔧',
    key: 'support',
  },
  {
    icon: '🌍',
    key: 'multilingual',
  },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t('whyus.title')}</h2>
          <p className="text-gray-600">{t('whyus.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="bg-white p-6 rounded-xl shadow-md text-center border-2 border-transparent hover:border-primary transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-primary">{t(`whyus.${feature.key}.title`)}</h3>
              <p className="text-gray-600">{t(`whyus.${feature.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
