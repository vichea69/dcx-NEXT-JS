'use client';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

const Element = () => {
  const t = useTranslations('Element');
  return (
    <div className="w-full bg-white">
      <section className="w-full bg-fuchsia-50 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-8 gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-3">{t('s1Badge')}</h3>
            <h2 className="text-gray-900 font-bold text-4xl md:text-5xl leading-tight mb-5">{t('s1Title')}</h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">{t('s1Desc')}</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image src="/assets/images/two.png" alt="Learn by doing" width={520} height={400} className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      <section className="w-full bg-blue-50 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-8 gap-12">
          <div className="md:w-1/2 flex justify-center">
            <Image src="/assets/images/one.png" alt="Put Your Learning Into Practice" width={520} height={400} className="rounded-xl shadow-lg" />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3">{t('s2Badge')}</h3>
            <h2 className="text-gray-900 font-bold text-4xl md:text-5xl leading-tight mb-5">{t('s2Title')}</h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">{t('s2Desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Element;