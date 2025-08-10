'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { cn } from '@/lib/utils';
import { X, Menu, LogIn, UserPlus, Languages } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import MobileNav from './mobile-nav';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const MainNav = ({ items, children }) => {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const router = useRouter();

  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (session) {
      (async () => {
        try {
          const res = await fetch('/api/me');
          const data = await res.json();
          setLoggedInUser(data);
        } catch (e) {}
      })();
    }
  }, [session]);

  const setLocale = (nextLocale) => {
    if (nextLocale === locale) return;
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-6 lg:gap-10 items-center">
        <Link href="/"><Logo /></Link>

        {items?.length > 0 && (
          <nav className="hidden gap-6 lg:flex">
            {items.map((item, index) => (
              <Link key={index} href={item.disable ? '#' : item.href} className={cn('text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm')}>
                {item.title}
              </Link>
            ))}
          </nav>
        )}

        {showMobileMenu && items && <MobileNav items={items}>{children}</MobileNav>}
      </div>

      <nav className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 rounded-full px-2 py-1">
              <Languages className="w-4 h-4" />
              <span className="text-xs uppercase">{locale}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 mt-4">
            <DropdownMenuItem onClick={() => setLocale('en')}>🇺🇸 {t('english')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale('kh')}>🇰🇭 {t('khmer')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {!session ? (
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className={cn(buttonVariants({ size: 'sm' }), 'px-4 flex items-center gap-1')}>
              <LogIn className="w-4 h-4" />
              {t('login')}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <UserPlus className="w-4 h-4" />
                  {t('register')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4">
                <DropdownMenuItem asChild><Link href="/register/student">{t('student')}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/register/instructor">{t('instructor')}</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={loggedInUser?.profilePicture || '/avatar.png'} alt="user" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-4">
              <DropdownMenuItem asChild><Link href="/account">{t('profile')}</Link></DropdownMenuItem>
              {loggedInUser?.role === 'instructor' && (
                <DropdownMenuItem asChild><Link href="/dashboard">{t('instructorDashboard')}</Link></DropdownMenuItem>
              )}
              <DropdownMenuItem asChild><Link href="/account/enrolled-courses">{t('myCourses')}</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="#">{t('testimonials')}</Link></DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#" onClick={(e) => { e.preventDefault(); signOut(); }}>{t('logout')}</Link>
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