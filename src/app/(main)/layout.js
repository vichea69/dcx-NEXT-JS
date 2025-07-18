import SiteFooter from "@/components/site-footer";
import MainNav from "@/components/main-nav";

const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Courses", href: "/courses" },
];

const MainLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">

            <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/70 backdrop-blur-md dark:bg-zinc-900/70 dark:border-zinc-700">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <MainNav items={navLinks} />
                </div>
            </header>


            <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
};

export default MainLayout;