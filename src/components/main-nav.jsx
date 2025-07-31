'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { cn } from '@/lib/utils';
import { X, Menu } from 'lucide-react';
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

    useEffect(() => {
        if (session) {
            // fetch /api/me to get role, etc.
            const fetchMe = async () => {
                try {
                    const res = await fetch('/api/me');
                    const data = await res.json();
                    setLoggedInUser(data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            fetchMe();
        }
    }, [session]);

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

            {/* RIGHT SIDE: Auth */}
            <nav className="flex items-center gap-3">
                {!session ? (
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/login"
                            className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
                        >
                            Login
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer">
                                <Avatar>
                                    <AvatarImage
                                        src={loggedInUser?.profilePicture || '/avatar.png'}
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
                                    <Link href="/dashboard">Instructor Dashboard</Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                                <Link href="/account/enrolled-courses">My Courses</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#">Testimonials & Certificates</Link>
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