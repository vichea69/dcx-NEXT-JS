import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {getUserByEmail} from "@/queires/user.js";
import {getEnrollmentsForUser} from "@/queires/enrollments.js";
import EnrolledCourseCard from "@/app/(main)/account/component/enrolled-coursecard.jsx";


async function EnrolledCourses() {

	const session = await auth();
	if (!session?.user) {
		redirect("/login");
	}

	const loggedInUser = await getUserByEmail(session?.user?.email);
	console.log(loggedInUser);

	const enrollments = await getEnrollmentsForUser(loggedInUser?.id)
	console.log(enrollments);

	return (
		<div className="grid sm:grid-cols-2 gap-6">
			{
				enrollments && enrollments.length > 0 ? (
					<>
						{ enrollments.map((enrollment) => (
							<EnrolledCourseCard key={enrollment?.id} enrollment={enrollment}  />
						))}
					</>
				) : (
					<p className="font-bold text-red-700">No Enrollments found!</p>
				)
			}
		</div>
	);
}

export default EnrolledCourses;