import React from 'react';
import Logo from './logo';

const SiteFooter = () => {
    return (
        <footer className="border-t border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-700">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:py-6">

                {/* Logo & Text Block */}
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
                    <Logo className="h-12 w-auto" />
                    <p className="text-sm text-center sm:text-left text-zinc-600 dark:text-zinc-400">
                        Built with ❤️ by <span className="font-semibold text-black dark:text-white">@Easy Learning 2025</span>
                    </p>
                </div>

                {/* Optional: Socials or Nav */}
                <div className="flex items-center gap-4">
                    {/* Add your social links or nav here if needed */}
                    {/* <a href="#" className="text-sm text-blue-500 hover:underline">Privacy</a> */}
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;