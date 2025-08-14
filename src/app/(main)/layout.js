import React from 'react'
import MainNav from '@/components/main-nav'
import SiteFooter from '@/components/site-footer'
import Providers from './providers'
import { getTranslations } from 'next-intl/server'

const MainLayout = async ({ children }) => {
    const t = await getTranslations('Nav')

    const navLinks = [
        { title: t('features'), href: '/features' },
        { title: t('pricing'), href: '/pricing' },
        { title: t('blog'), href: '/blog' },
    ]

    return (
        <Providers>
            <div className='flex min-h-screen flex-col'>
                {/* Sticky Header */}
                <header className='fixed top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-md border-b'>
                    <div className='container mx-auto px-4 flex h-20 items-center justify-between'>
                        <MainNav items={navLinks} />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 pt-24 flex flex-col items-center">
                    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <SiteFooter />
            </div>
        </Providers>
    )
}

export default MainLayout