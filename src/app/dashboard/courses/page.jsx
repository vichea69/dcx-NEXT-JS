import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ObjectId } from "mongoose";
// const courses = [
//   {
//     id: 1,
//     title: "Reactive Accelerator",
//     price: 49,
//     isPublished: true,
//   },
//   {
//     id: 2,
//     title: "Think In A Redux Way",
//     price: 10,
//     isPublished: false,
//   },
// ];
const CoursesPage = async () => {

  const courses = sanitizeData(await getInstructorDashboardData()) ;
  console.log(courses);

  return (
      <div className="p-6">
        {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
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