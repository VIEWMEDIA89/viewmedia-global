'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const steps = [
  {
    key: 'inquiry',
    icon: '📞',
    color: 'bg-blue-500',
  },
  {
    key: 'planning',
    icon: '📋',
    color: 'bg-purple-500',
  },
  {
    key: 'installation',
    icon: '🔧',
    color: 'bg-green-500',
  },
  {
    key: 'operation',
    icon: '▶️',
    color: 'bg-orange-500',
  },
  {
    key: 'removal',
    icon: '✅',
    color: 'bg-red-500',
  },
];

export default function Process() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t('process.title')}</h2>
          <p className="text-gray-600">{t('process.subtitle')}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex flex-col items-center text-center max-w-[180px]"
            >
              <div className={`${step.color} text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{t(`process.${step.key}.title`)}</h3>
              <p className="text-gray-600 text-sm">{t(`process.${step.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
