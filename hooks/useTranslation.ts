'use client';

import { useState } from 'react';
import { Locale, translations } from '@/locales/translations';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, locale, setLocale };
}
