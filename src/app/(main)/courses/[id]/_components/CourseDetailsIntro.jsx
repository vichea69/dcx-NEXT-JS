import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import EnrollCourse from "@/components/enroll-course";

const CourseDetailsIntro = ({ course }) => {
  return (
      <div className="overflow-x-hidden grainy">
        <section className="pt-8 sm:pt-12 md:pt-16">
          <div className="container">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              {/* Headline */}
              <div className="mx-auto text-center max-w-2xl">
                <h1 className="text-sm sm:text-base md:text-lg text-gray-600 font-inter px-2">
                  {course?.subtitle}
                </h1>

                <p className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 font-pj">
                <span className="relative inline-flex">
                  <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0" />
                  <span className="relative">{course?.title}</span>
                </span>
                </p>

                {/* Actions */}
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                  <EnrollCourse courseId={course?.id} />
                  <Link
                      href=""
                      className={cn(
                          buttonVariants({ variant: "outline", size: "lg" }),
                          "w-full sm:w-auto"
                      )}
                  >
                    See Intro
                  </Link>
                  <Link
                      href=""
                      className={cn(
                          buttonVariants({ variant: "destructive", size: "lg" }),
                          "w-full sm:w-auto"
                      )}
                  >
                    Price : ${course?.price}
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="pb-10 sm:pb-12 mt-6">
              <div className="relative mx-auto lg:max-w-3xl px-4 sm:px-6 lg:px-0">
                {/* Aspect ratio wrapper for consistent sizing on mobile */}
                <div className="relative w-full overflow-hidden rounded-lg aspect-[16/9]">
                  <Image
                      src={`/assets/images/courses/${course?.thumbnail}`}
                      alt={course?.title || "Course cover"}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 80vw,
                         768px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default CourseDetailsIntro;