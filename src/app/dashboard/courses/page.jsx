export const dynamic = "force-dynamic";
import { getInstructorDashboardData, COURSE_DATA } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ObjectId } from "mongoose";

const CoursesPage = async () => {
  const courses = sanitizeData(await getInstructorDashboardData(COURSE_DATA));
  console.log(courses);

  // const courses = sanitizeData(await getInstructorDashboardData()) ;
  // console.log(courses);

  return (
      <div className="p-6">
        <DataTable columns={columns} data={courses} />
      </div>
  );
};

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

export default CoursesPage;