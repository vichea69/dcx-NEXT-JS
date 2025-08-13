import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import {
    ArrowRight,
    ArrowRightIcon,
    BookOpen,
    MessageSquare,
    Presentation,
    Star,
    UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const InstructorProfile = async ({ params: { id } }) => {

    const courseDetailsByInstructor = await getCourseDetailsByInstructor(id.toString());
    //console.log(courseDetailsByInstructor);


    return (
        <section id="categories" className="space-y-6  py-6  lg:py-12">
            <div className="container grid grid-cols-12 lg:gap-x-8 gap-y-8">
                {/* Instructor Info */}
                <div className="col-span-12 lg:col-span-4 ">
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <div className="mb-6">
                            <div className="w-36 h-36 rounded-full  mb-5 mx-auto overflow-hidden">
                                <Image
                                    src={courseDetailsByInstructor?.insImage || "/assets/images/fallback-user.png"}
                                    alt={courseDetailsByInstructor?.fullInsName || "Instructor profile image"}
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>

                            <div>
                                <h4 className="text-xl lg:text-2xl text-center">
                                    {courseDetailsByInstructor?.fullInsName}
                                </h4>
                                <div className="text-gray-600 font-medium mb-6 text-sm text-center">
                                    {courseDetailsByInstructor?.Designation}
                                </div>
                                <ul className=" items-center gap-3 flex-wrap text-sm text-gray-600 font-medium grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-4">
                                    <li className="flex items-center space-x-3">
                                        <Presentation className="text-gray-600 w-4" />
                                        <div>{courseDetailsByInstructor?.courses} Courses</div>
                                    </li>
                                    {/*<li className="flex items-center space-x-3">*/}
                                    {/*    <UsersRound className="text-gray-600 w-4" />*/}
                                    {/*    <div>{courseDetailsByInstructor?.enrollments}+ Students</div>*/}
                                    {/*</li>*/}
                                    <li className="flex items-center space-x-3">
                                        <MessageSquare className="text-gray-600 w-4" />
                                        <div>{courseDetailsByInstructor?.reviews} Reviews</div>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <Star className="text-gray-600 w-4" />
                                        <div>{courseDetailsByInstructor?.ratings} Average Rating</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs leading-[1.8] text-justify">
                            Hi! I'm Kazi Ariyan. I'm a web developer with a serious love for teaching I am a founder of easy Learning and a passionate Web Developer, Programmer & Instructor.
                            <br />
                            I am working online for the last 9 years and have created several successful websites running on the internet. I try to create a project-based course that helps you to learn professionally and make you fell as a complete developer. easy learning exists to help you succeed in life.

                        </p>
                    </div>
                </div>
                {/* Courses */}
                <div className="col-span-12 lg:col-span-8">
                    <div>
                        <SectionTitle className="mb-6">Courses</SectionTitle>
                        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {Array.isArray(courseDetailsByInstructor?.inscourses) &&

                                courseDetailsByInstructor?.inscourses.map((course) => {
                                    return (
                                        <Link key={course._id} href={`/courses/${course._id}`}>
                                            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                                                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                                                    <Image
                                                        src={course?.thumbnail?.startsWith('http') ? course.thumbnail : `/assets/images/courses/${course?.thumbnail}`}
                                                        alt={course.title}
                                                        className="object-cover"
                                                        fill
                                                    />
                                                </div>
                                                <div className="flex flex-col pt-2">
                                                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                                                        {course?.localizedTitle || course?.title}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {course?.category?.title}
                                                    </p>
                                                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                                                        <div className="flex items-center gap-x-1 text-slate-500">
                                                            <div>
                                                                <BookOpen className="w-4" />
                                                            </div>
                                                            <span>{course?.modules?.length} Chapters</span>
                                                        </div>
                                                    </div>




                                                    <div className="flex items-center justify-between mt-4">
                                                        <p className="text-md md:text-sm font-medium text-slate-700">
                                                            {formatPrice(course?.price)}
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
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default InstructorProfile;