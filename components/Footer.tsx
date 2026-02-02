'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">VIEW-MEDIA</h3>
            <p className="text-gray-400 mb-4">{t('footer.aboutText')}</p>
            <p className="text-gray-400">📍 {t('footer.address')}</p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">LED Screen Rental</li>
              <li className="hover:text-white transition cursor-pointer">Event Production</li>
              <li className="hover:text-white transition cursor-pointer">AV Equipment</li>
              <li className="hover:text-white transition cursor-pointer">Long-term Rental</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 viewmedia@view-media.kr</li>
              <li>📞 +82-1644-4262</li>
              <li>💬 WhatsApp: +82-10-2839-3313</li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {['🔗', '📸', '🎬', '💼'].map((icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl hover:text-primary transition"
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 pt-8 text-center text-gray-400"
        >
          <p>© {new Date().getFullYear()} VIEW-MEDIA Co., Ltd. {t('footer.rights')}</p>
          <p className="mt-2 text-sm">
            Seoul, South Korea | Everything about Visualization
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
