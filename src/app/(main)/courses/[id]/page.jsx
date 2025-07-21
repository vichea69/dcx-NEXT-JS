import { formatPrice } from "@/lib/formatPrice";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDetails } from "@/queires/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";
 
export default async function SingleCoursePage({ params }) {
  const { id } = await params;
  const course = await getCourseDetails(id);
  //console.log(course);
    
  return (
    <>
      <CourseDetailsIntro 
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />

      <CourseDetails/>

      {
        course?.testimonials && (
          <Testimonials testimonials={replaceMongoIdInArray(course.testimonials)} />
        )
      }
      
     <RelatedCourses/>
      
    </>
  );
}