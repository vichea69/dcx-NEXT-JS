import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ENROLLMENT_DATA, getInstructorDashboardData } from "@/lib/dashboard-helper";
import { ObjectId } from "mongoose";

const EnrollmentsPage = async ({ params: {courseId} }) => {

  const course = await getCourseDetails(courseId);
  const allEnrollments = await getInstructorDashboardData(ENROLLMENT_DATA);

  const enrollmentData = sanitizeData(allEnrollments)

  const enrollmentForCourse = enrollmentData.filter((enrollment) => enrollment?.course?.toString() === courseId)

  // console.log(enrollmentForCourse)

  return (
      <div className="p-6">
        {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
        <h2>{ course?.title }</h2>
        <DataTable columns={columns} data={enrollmentForCourse} />
      </div>
  );
};

// Sanitize fucntion for handle ObjectID and Buffer
function sanitizeData(data) {
  return JSON.parse(
      JSON.stringify(data, (key, value) => {
        if (value instanceof ObjectId) {
          return value.toString();
        }
        if (Buffer.isBuffer(value)) {
          return value.toString("base64")
        }
        return value;
      })
  );
}

export default EnrollmentsPage;