'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { cn } from '@/lib/utils';

import { X } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import MobileNav from './mobile-nav';
import { useSession , signOut } from 'next-auth/react';

const MainNav = ({items,children}) => {
    const {data:session} = useSession();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [loginSession, setLoginSession] = useState(null);

    useEffect(() => {
        console.log("Test information");
        setLoginSession(session);
    },[session]);


    return (
        <div className="flex w-full justify-between items-center">
            {/* LEFT SIDE: Logo + Nav */}
            <div className='flex gap-6 lg:gap-10 items-center'>
                <Link href="/">
                    <Logo />
                </Link>

                {items?.length > 0 && (
                    <nav className='hidden gap-6 lg:flex'>
                        {items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disable ? "#" : item.href}
                                className={cn("text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm")}
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
                {!loginSession ? (
                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/login" className={cn(buttonVariants({ size: "sm" }), "px-4")}>
                            Login
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">Register</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-4">
                                <DropdownMenuItem>
                                    <Link href="/register/student">Student</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/register/instructor">Instructor</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='cursor-pointer'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@ariyan" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-4">
                            <DropdownMenuItem asChild><Link href="/account">Profile</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/account/enrolled-courses">My Courses</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="#">Testimonials & Certificates</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#" onClick={(e) => { e.preventDefault(); signOut(); }}>Logout</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                <button className="flex lg:hidden items-center space-x-2" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu ? <X /> : <Menu />}
                </button>
            </nav>
        </div>
    );
};

export default MainNav;