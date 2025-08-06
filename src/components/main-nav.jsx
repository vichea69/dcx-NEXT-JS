// This component defines the main navigation bar for a Next.js application.
// In addition to the original functionality of rendering navigation links,
// handling authentication state, and toggling a mobile menu, this version
// introduces a language switcher and adds icons next to the login and
// registration buttons. The language switcher allows users to toggle
// between English and Khmer. Icons are provided by lucide-react to
// visually enhance the login and registration options.  These changes
// maintain the original structure and behavior while adding new UI
// functionality.  Note: integrating actual locale switching would
// require additional application logic; here we only update UI state.
'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { cn } from '@/lib/utils';
// Import additional icons from lucide-react for language, login, and signup
import { X, Menu, LogIn, UserPlus, Languages } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import MobileNav from './mobile-nav';
import { useSession, signOut } from 'next-auth/react';

const MainNav = ({ items, children }) => {
    const { data: session } = useSession();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [language, setLanguage] = useState('en');

    // Determine which flag emoji to display based on the selected language.
    // The United States flag 🇺🇸 represents English and the Cambodian flag 🇰🇭 represents Khmer.
    const currentFlag = language === 'kh' ? '🇰🇭' : '🇺🇸';


    // Fetch authenticated user details when a session exists
    useEffect(() => {
        if (session) {
            const fetchMe = async () => {
                try {
                    const res = await fetch('/api/me');
                    const data = await res.json();
                    setLoggedInUser(data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };
            fetchMe();
        }
    }, [session]);

    /**
     * Handle language changes from the language dropdown. In a real
     * application this function could be extended to integrate with an
     * internationalization library (e.g., next-i18next) or a custom
     * context provider to update the app’s locale. For now, it simply
     * stores the selected language in local state.
     * @param {string} lang The language code to set ('en' or 'kh').
     */
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        // Additional logic for switching locales can be added here.
    };

    return (
        <div className="flex w-full justify-between items-center">
            {/* LEFT SIDE */}
            <div className="flex gap-6 lg:gap-10 items-center">
                <Link href="/">
                    <Logo />
                </Link>

                {items?.length > 0 && (
                    <nav className="hidden gap-6 lg:flex">
                        {items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disable ? '#' : item.href}
                                className={cn(
                                    'text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm'
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                )}

                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>

            {/* RIGHT SIDE: Language Switcher & Auth */}
            <nav className="flex items-center gap-3">
                {/* Language selector available on all screen sizes */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 rounded-full px-2 py-1"
                        >
                            {/* Display a globe icon along with a dynamic flag representing the selected language. */}
                            <Languages className="w-4 h-4" />
                            <span className="text-base">
                                {currentFlag}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32 mt-4">
                        {/* Include flag emojis next to language names */}
                        <DropdownMenuItem
                            onClick={() => handleLanguageChange('en')}
                        >
                            <span className="mr-2">🇺🇸</span>English
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleLanguageChange('kh')}
                        >
                            <span className="mr-2">🇰🇭</span>Khmer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* If the user is not signed in, show Login/Register with icons */}
                {!session ? (
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants({ size: 'sm' }),
                                'px-4 flex items-center gap-1'
                            )}
                        >
                            {/* LogIn icon adjacent to the text */}
                            <LogIn className="w-4 h-4" />
                            Login
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    {/* UserPlus icon for signup */}
                                    <UserPlus className="w-4 h-4" />
                                    Register
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-4">
                                <DropdownMenuItem asChild>
                                    <Link href="/register/student">Student</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/register/instructor">Instructor</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    // If user is signed in, show avatar with dropdown
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer">
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            loggedInUser?.profilePicture ||
                                            '/avatar.png'
                                        }
                                        alt="user"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-4">
                            <DropdownMenuItem asChild>
                                <Link href="/account">Profile</Link>
                            </DropdownMenuItem>
                            {loggedInUser?.role === 'instructor' && (
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">
                                        Instructor Dashboard
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                                <Link href="/account/enrolled-courses">
                                    My Courses
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#">
                                    Testimonials & Certificates
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}
                                >
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {/* Mobile menu toggle */}
                <button
                    className="flex lg:hidden items-center space-x-2"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <X /> : <Menu />}
                </button>
            </nav>
        </div>
    );
};

export default MainNav;