import {auth} from "@/auth.js";
import {getUserByEmail} from "@/queries/user.js";
import {getCourseDetailsByInstructor} from "@/queries/courses.js";

export async function getInstructorDashboardData(){
    try {
        const session = await auth();
        const instructor = await getUserByEmail(session?.user?.email);
        //console.log(instructor);
        const data = await getCourseDetailsByInstructor(instructor?.id, true);
        return data;
    }catch (error) {
        console.log(error);
    }
}