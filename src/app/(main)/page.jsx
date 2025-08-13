import { SectionTitle } from "@/components/section-title";
import Support from "@/components/support";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseCard from "./courses/_components/CourseCard";
import Element from "@/components/element";
import { getCourseList } from "@/queries/courses.js";
import { getCategories } from "@/queries/categories.js";
import { cookies } from "next/headers";

const HomePage = async ({ params: { locale } }) => {
  const cookieStore = await cookies();
  const activeLocale = cookieStore.get('locale')?.value || 'en';

  const messages = (
    await import(`../../messages/${activeLocale}.json`).catch(async () => ({
      default: (await import(`../../messages/en.json`)).default
    }))
  ).default;

  const t = (key) => messages.Home[key];

  const courses = await getCourseList();
  const localizedCourses = courses.map(c => ({
    ...c,
    localizedTitle: activeLocale === 'kh' ? (c.titleKh || c.title) : c.title,
  }));
  const categories = await getCategories();

  return (
    <>
      <section className="grainy space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container max-w-screen-xl mx-auto flex flex-col items-center gap-4 text-center relative px-4 sm:px-8 isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72rem]"
            />
          </div>

          <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium border shadow-lg">
            {t('welcomeBadge')}
          </span>

          <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {t('headlineLine1')} <br />
            {t('headlineLine2')}
          </h1>

          <p className="max-w-2xl text-muted-foreground text-base sm:text-xl leading-relaxed">
            {t('quote')}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
            <Link href="/courses" className={cn(buttonVariants({ size: "lg" }))}>
              {t('exploreNow')}
            </Link>
            <Link
              href="/register/instructor"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {t('becomeInstructor')}
            </Link>
          </div>
        </div>
      </section>

      <Element />

      <section id="categories" className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 lg:py-24 px-4 sm:px-8">
        <div className="flex items-center justify-between w-full">
          <SectionTitle>{t('categoriesTitle')}</SectionTitle>
          <Link href="#" className="text-sm sm:text-base font-medium hover:opacity-80 flex items-center gap-x-1.5 whitespace-nowrap">
            {t('browseAll')} <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={"#"} className="relative overflow-hidden rounded-lg border bg-background p-2 hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center justify-between gap-4 p-4 text-center">
                <Image src={`/assets/images/categories/${category.thumbnail}`} alt={category.title} width={100} height={100} className="object-cover" />
                <h3 className="font-bold text-sm sm:text-base">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="courses" className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 lg:py-24 px-4 sm:px-8">
        <div className="flex items-center justify-between w-full">
          <SectionTitle>{t('coursesTitle')}</SectionTitle>
          <Link href="/courses" className="text-sm sm:text-base font-medium hover:opacity-80 flex items-center gap-x-1.5 whitespace-nowrap">
            {t('browseAll')} <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {localizedCourses.map((course) => (<CourseCard key={course.id} course={course} />))}
        </div>
      </section>

      <Support />
    </>
  );
};

export default HomePage;