
import { SectionTitle } from "@/components/section-title";
import Support from "@/components/support";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { BookOpen, ArrowRightIcon, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseCard from "./courses/_components/CourseCard";
import Element from "@/components/element";
import { getCourseList } from "@/queries/courses.js";
import { getCategories } from "@/queries/categories.js";

const HomePage = async () => {
  const courses = await getCourseList();
  const categories = await getCategories();
  // console.log(courses);
  // console.log(categories);

  return (
      <>
        {/* Hero Section */}
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
            Hey, Welcome
          </span>

            <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Learn By Doing with <br />
              Easy Learning
            </h1>

            <p className="max-w-2xl text-muted-foreground text-base sm:text-xl leading-relaxed">
              “You don’t understand anything until you learn it more than one way.”
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
              <Link href="/courses" className={cn(buttonVariants({ size: "lg" }))}>
                Explore Now
              </Link>
              <Link
                  href='/register/instructor'
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Become An Instructor
              </Link>
            </div>
          </div>
        </section>

        {/* Educational Feature Section */}
        <Element />

        {/* Categories Section */}
        <section
            id="categories"
            className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 lg:py-24 px-4 sm:px-8"
        >
          <div className="flex items-center justify-between w-full">
      <SectionTitle>Categories</SectionTitle>
      <Link
        href="/categories"
        className="text-sm sm:text-base font-medium hover:opacity-80 flex items-center gap-x-1.5 whitespace-nowrap"
      >
        Browse All <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
      </Link>
    </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="relative overflow-hidden rounded-lg border bg-background p-2 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex flex-col items-center justify-between gap-4 p-4 text-center">
                    <Image
                        src={`/assets/images/categories/${category.thumbnail}`}
                        alt={category.title}
                        width={100}
                        height={100}
                        className="object-cover"
                    />
                    <h3 className="font-bold text-sm sm:text-base">{category.title}</h3>
                  </div>
                </Link>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section
            id="courses"
            className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 lg:py-24 px-4 sm:px-8"
        >
          <div className="flex items-center justify-between w-full">
          <SectionTitle>Courses</SectionTitle>
          <Link
            href="/courses"
            className="text-sm sm:text-base font-medium hover:opacity-80 flex items-center gap-x-1.5 whitespace-nowrap"
          >
            Browse All <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
          </Link>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <Support />
      </>
  );
};

export default HomePage;