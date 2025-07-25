import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queires/courses";
import { enrollForCourse } from "@/queires/enrollments";
import { getUserByEmail } from "@/queires/user";
import { CircleCheck, Sparkles, Trophy, Play, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) {
    throw new Error("Please provide a valid session id that start with cs_");
  }

  const userSession = await auth();
  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = paymentIntent?.status;

  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;

  if (paymentStatus === "succeeded") {
    // Update data to enrollment table
      const enrolled = await enrollForCourse(
      course?.id,
      loggedInUser?.id,
      "stripe"
    );
    console.log(enrolled);
    // Send emails to the instructor and student who paid

    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;
    //console.log(instructorName,instructorEmail);

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment For ${productName}`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. `
      },
      {
        to: customerEmail,
        subject: `Enrollment success for ${productName}`,
        message: `Hey, ${customerName}. You have successfully enrolled for the course ${productName} `
      }
    ];

      const emailSendResponse = await sendEmails(emailsToSend);
      console.log(emailSendResponse);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute w-6 h-6 text-violet-400 opacity-60 animate-bounce`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {paymentStatus === "succeeded" && (
          <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            {/* Success Icon with animation */}
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-6 shadow-2xl">
                <CircleCheck className="w-20 h-20 text-white animate-in zoom-in-0 duration-500 delay-300" />
              </div>
            </div>

            {/* Trophy icon */}
            <div className="flex justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
              <Trophy className="w-12 h-12 text-amber-500" />
            </div>

            {/* Main heading */}
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 bg-clip-text text-transparent leading-tight">
                🎉 Congratulations!
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-700 font-medium max-w-3xl mx-auto leading-relaxed">
                <span className="text-violet-600 font-semibold">{customerName}</span>, you've successfully enrolled in{" "}
                <span className="text-cyan-600 font-semibold">"{productName}"</span>
              </p>
            </div>

            {/* Success message */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-600">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-lg font-medium text-slate-700">Your learning journey begins now!</p>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-500"></div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Get ready to unlock new skills and knowledge. Your course materials are now available,
                and you can start learning immediately.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-800">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-violet-500/25"
              >
                <Link href="#" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Learning Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold px-8 py-3 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/courses" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Browse More Courses
                </Link>
              </Button>
            </div>

            {/* Additional info */}
            <div className="pt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-1000">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Confirmation email sent to {customerEmail}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;