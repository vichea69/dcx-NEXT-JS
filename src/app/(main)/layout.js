'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import MainNav from '@/components/main-nav'
import SiteFooter from '@/components/site-footer'
import { Toaster } from 'sonner';

const navLinks = [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Blog', href: '/blog' },
    { title: 'Dashboard', href: '/dashboard' },
]

const MainLayout = ({ children }) => {
    return (
        <SessionProvider>
            <div className='flex min-h-screen flex-col'>
                {/* Sticky Header */}
                <header className='fixed top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-md border-b'>
                    <div className='container mx-auto px-4 flex h-20 items-center justify-between'>
                        <MainNav items={navLinks} />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 pt-24 flex flex-col items-center">
                    <Toaster position="top-right" richColors />
                    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <SiteFooter />
            </div>
        </SessionProvider>
    )
}

export default MainLayout