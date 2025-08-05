import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import EnrolledCourseCard from "../../component/enrolled-coursecard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import Link from "next/link";
import { getUserByEmail } from "@/queries/user";

async function EnrolledCourses() {

	const session = await auth();
	if (!session?.user) {
		redirect("/login");
	}

	const loggedInUser = await getUserByEmail(session?.user?.email);

	const enrollments = await getEnrollmentsForUser(loggedInUser?.id)
	//console.log(enrollments);

	return (
		<div className="grid sm:grid-cols-2 gap-6">
			{
				enrollments && enrollments.length > 0 ? (
					<>
						{enrollments.map((enrollment) => (
							<Link
								key={enrollment?.id}
								href={`/courses/${enrollment.course._id.toString()}/lesson`}
							>
								<EnrolledCourseCard key={enrollment?.id} enrollment={enrollment} />
							</Link>
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