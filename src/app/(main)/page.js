import Element from "@/components/element";
import { SectionTitle } from "@/components/section-title";
import Support from "@/components/support";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { BookOpen, ArrowRightIcon, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: 1,
        title: "Design",
        thumbnail: "/assets/images/categories/design.jpg",
    },

    {
        id: 3,
        title: "Development",
        thumbnail: "/assets/images/categories/development.jpg",
    },
    {
        id: 4,
        title: "Marketing",
        thumbnail: "/assets/images/categories/marketing.jpg",
    },
    {
        id: 5,
        title: "IT & Software",
        thumbnail: "/assets/images/categories/it_software.jpg",
    },
    {
        id: 6,
        title: "Personal Development",
        thumbnail: "/assets/images/categories/personal_development.jpg",
    },
    {
        id: 7,
        title: "Business",
        thumbnail: "/assets/images/categories/programming.jpg",
    },
    {
        id: 8,
        title: "Photography",
        thumbnail: "/assets/images/categories/photography.jpg",
    },
    {
        id: 9,
        title: "Music",
        thumbnail: "/assets/images/categories/music.jpg",
    },
];

const courses = [
    {
        id: 1,
        title: "Design",
        thumbnail: "/assets/images/categories/design.jpg",
    },

    {
        id: 3,
        title: "Development",
        thumbnail: "/assets/images/categories/development.jpg",
    },
    {
        id: 4,
        title: "Marketing",
        thumbnail: "/assets/images/categories/marketing.jpg",
    },
    {
        id: 5,
        title: "IT & Software",
        thumbnail: "/assets/images/categories/it_software.jpg",
    },
    {
        id: 6,
        title: "Personal Development",
        thumbnail: "/assets/images/categories/personal_development.jpg",
    },
    {
        id: 7,
        title: "Business",
        thumbnail: "/assets/images/categories/business.jpg",
    },
    {
        id: 8,
        title: "Photography",
        thumbnail: "/assets/images/categories/photography.jpg",
    },
    {
        id: 9,
        title: "Music",
        thumbnail: "/assets/images/categories/music.jpg",
    },
];

const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="grainy space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container max-w-screen-xl mx-auto flex flex-col items-center gap-4 text-center relative px-4 sm:px-8 isolate">
                    {/* BG Effect */}
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
                    <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8 mx-auto">
                        “You don’t understand anything until you learn it more than one way.”
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="" className={cn(buttonVariants({ size: "lg" }))}>
                            Explore Now
                        </Link>
                        <Link
                            href=""
                            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                        >
                            Become An Instructor
                        </Link>
                    </div>
                </div>
            </section>

            <Element/>

            {/* Categories Section */}
            <section id="categories" className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 lg:py-24 px-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <SectionTitle>Categories</SectionTitle>
                    <Link
                        href={""}
                        className="text-sm font-medium hover:opacity-80 flex items-center gap-1 mt-2 md:mt-0"
                    >
                        Browse All <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {categories.map((category) => (
                        <Link
                            href=""
                            key={category.id}
                            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:scale-105 transition-all duration-300"
                        >
                            <div className="flex flex-col gap-4 items-center justify-between rounded-md p-4 md:p-6">
                                <Image
                                    src={category.thumbnail}
                                    alt={category.title}
                                    width={100}
                                    height={100}
                                    className="object-cover rounded"
                                    style={{ maxWidth: '90px', height: 'auto' }}
                                />
                                <h3 className="font-bold text-center text-sm sm:text-base">{category.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 lg:py-24 px-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <SectionTitle>Courses</SectionTitle>
                    <Link
                        href={""}
                        className="text-sm font-medium hover:opacity-80 flex items-center gap-1 mt-2 md:mt-0"
                    >
                        Browse All <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {courses.map((category) => (
                        <Link key={category.id} href={`/courses/${category.id}`}>
                            <div className="group hover:shadow-md transition overflow-hidden border rounded-lg p-3 h-full flex flex-col">
                                <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
                                    <Image
                                        src="/assets/images/courses/course_1.png"
                                        alt={"course"}
                                        className="object-cover"
                                        fill
                                    />
                                </div>
                                <div className="flex flex-col pt-2 flex-1">
                                    <div className="text-base md:text-lg font-medium group-hover:text-sky-700 line-clamp-2">
                                        Reactive Accelerator
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">Development</p>
                                    <div className="my-2 flex items-center gap-x-2 text-sm md:text-xs">
                                        <div className="flex items-center gap-x-1 text-slate-500">
                                            <BookOpen className="w-4" />
                                            <span>4 Chapters</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <p className="text-md md:text-sm font-medium text-slate-700">
                                            {formatPrice(49)}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            className="text-xs text-sky-700 h-7 gap-1"
                                        >
                                            Enroll
                                            <ArrowRight className="w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>


            <Support/>
        </>
    );
};

export default HomePage;