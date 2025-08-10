'use client';
import React from 'react';
import Logo from './logo';
import { useTranslations } from 'next-intl';

const SiteFooter = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="border-t border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-700">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:py-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
          <Logo className="h-12 w-auto" />
          <p className="text-sm text-center sm:text-left text-zinc-600 dark:text-zinc-400">
            {t('builtWith')} <span className="font-semibold text-black dark:text-white">{t('brand')}</span>
          </p>
        </div>
        <div className="flex items-center gap-4" />
      </div>
    </footer>
  );
};

export default SiteFooter;