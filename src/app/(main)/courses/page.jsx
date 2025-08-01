import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";
import CourseCard from "./_components/CourseCard";
import {getCourseList} from "@/queries/courses.js";


const CoursesPage = async () => {

    const courses = await getCourseList();


    return (
        <section
            id="courses"
            className="container space-y-6 dark:bg-transparent py-6 px-4"
        >
            {/* <h2 className="text-xl md:text-2xl font-medium">All Courses</h2> */}
            {/* header */}
            <div className="flex items-baseline justify-between border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row flex-wrap">

                <div className="w-full lg:w-auto">
                    <SearchCourse/>
                </div>

                <div className="flex items-center justify-end gap-2 max-lg:w-full">
                    <SortCourse/>

                    {/* Filter Menus For Mobile */}

                    <FilterCourseMobile/>
                </div>
            </div>
            {/* header ends */}
            {/* active filters */}

            {/*<ActiveFilters*/}
            {/*    filter={{*/}
            {/*        categories: ["development"],*/}
            {/*        price: ["free"],*/}
            {/*        sort: ""*/}
            {/*    }}*/}
            {/*/>*/}

            <section className="pb-24 pt-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    {/* these component can be re use for mobile also */}
                    <div className="mb-6 lg:mb-0">
                        <FilterCourse/>
                    </div>
                    {/* Course grid */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {courses.map((course) => {
                            return (
                                <CourseCard key={course.id} course={course} />
                            );
                        })}
                    </div>
                </div>
            </section>
        </section>
    );
};
export default CoursesPage;