// app/courses/[id]/page.tsx
import { replaceMongoIdInArray } from "@/lib/convertData";
import { getCourseDetails } from "@/queries/courses";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { cookies } from "next/headers";

// ✅ stream/lazy-load below-the-fold bits (likely client components)
const Testimonials = dynamic(() => import("./_components/Testimonials"), {
    loading: () => <div className="h-24" />,
    // If Testimonials is a client component, keep ssr true so it can stream HTML shell
    // If it’s heavy client-only logic, flip to ssr: false.
    // ssr: false,
});
const RelatedCourses = dynamic(() => import("./_components/RelatedCourses"), {
    loading: () => <div className="h-24" />,
    // ssr: false,
});

// Cache the page for speed; revalidate content periodically
export const revalidate = 600; // 10 minutes
// export const dynamic = "force-static"; // uncomment if the route can be fully static

export default async function SingleCoursePage({ params }) {
    const { id } = await params; // ✅ await params first
    const course = await getCourseDetails(id);

    // Determine active locale from cookie and compute localized fields
    const cookieStore = await cookies();
    const activeLocale = cookieStore.get('locale')?.value || 'en';

    const localizedCourse = {
        ...course,
        localizedTitle: activeLocale === 'kh' ? (course?.titleKh || course?.title) : course?.title,
        localizedSubtitle: activeLocale === 'kh' ? (course?.subtitleKh || course?.subtitle) : course?.subtitle,
        localizedDescription: activeLocale === 'kh' ? (course?.descriptionKh || course?.description) : course?.description,
    };

    return (
        <main className="overflow-x-hidden">
            {/* Mobile-first container & spacing */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Hero / Intro — keep above the fold lean */}
                <section className="pt-8 sm:pt-12 md:pt-16">
                    <CourseDetailsIntro course={localizedCourse} />
                </section>

                {/* Key details */}
                <section className="pt-6 sm:pt-8 md:pt-10">
                    <CourseDetails course={localizedCourse} />
                </section>

                {/* Testimonials — lazy/streamed, mobile-optimized spacing */}
                {course?.testimonials?.length > 0 && (
                    <section className="pt-8 sm:pt-10 md:pt-14">
                        <Suspense fallback={<div className="h-24" />}>
                            <Testimonials
                                testimonials={replaceMongoIdInArray(course.testimonials)}
                            />
                        </Suspense>
                    </section>
                )}

                {/* Related courses — lazy/streamed */}
                <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20">
                    <Suspense fallback={<div className="h-24" />}>
                        <RelatedCourses />
                    </Suspense>
                </section>
            </div>
        </main>
    );
}