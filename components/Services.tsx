'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const services = [
  {
    icon: '📺',
    key: 'led',
  },
  {
    icon: '🎬',
    key: 'production',
  },
  {
    icon: '🎤',
    key: 'av',
  },
  {
    icon: '🎨',
    key: 'visualization',
  },
  {
    icon: '📋',
    key: 'atoz',
  },
  {
    icon: '👔',
    key: 'vip',
  },
  {
    icon: '🌏',
    key: 'mice',
  },
  {
    icon: '🤝',
    key: 'korea',
  },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-gray-600">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{t(`services.${service.key}.title`)}</h3>
              <p className="text-gray-600">{t(`services.${service.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
