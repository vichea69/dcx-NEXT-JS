import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseOverview from "./CourseOverview";
import CourseCurriculam from "./CourseCurriculam";
import CourseInstructor from "./CourseInstructor";
import Image from "next/image";
import { formatMyDate } from "@/lib/date";
import { getTranslations } from 'next-intl/server';

const CourseDetails = async ({ course }) => {
  // Safely handle undefined course or modifiedOn
  let lastModifiedDate = "N/A";
  if (course?.modifiedOn) {
    lastModifiedDate = formatMyDate(course.modifiedOn);
  }
  const t = await getTranslations('Course');

  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className="bg-green-500 px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block">
          {course?.category?.localizedTitle || course?.category?.title}
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
          {course?.localizedTitle || course?.title}
        </h3>
        <p className="mt-3 text-gray-600 text-sm">
          {course?.localizedSubtitle || course?.subtitle}
        </p>

        {/* Instructor & Last Updated */}
        <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
          <div className="flex items-center gap-2">
            <Image
              className="w-[40px] h-[40px] rounded-full"
              src={course?.instructor?.profilePicture}
              alt={course?.instructor?.firstName}
              width={20}
              height={20}
            />
            <p className="font-bold">
              {course?.instructor?.firstName}{" "}
              {course?.instructor?.lastName}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-semibold">{t('lastUpdated')}:</span>
            <span>{lastModifiedDate}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
              <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
              <TabsTrigger value="curriculum">{t('curriculum')}</TabsTrigger>
              <TabsTrigger value="instructor">{t('instructor')}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <CourseOverview course={course} />
            </TabsContent>

            <TabsContent value="curriculum">
              <CourseCurriculam course={course} />
            </TabsContent>

            <TabsContent value="instructor">
              <CourseInstructor course={course} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;