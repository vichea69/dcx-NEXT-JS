
import { CourseProgress } from "@/components/course-progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { ReviewModal } from "./review-modal";
import { DownloadCertificate } from "./download-certificate";
import { GiveReview } from "./give-review";
import { SidebarModules } from "./sidebar-modules";
import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { ObjectId } from "mongoose";

export const CourseSidebar = async ({ courseId }) => {

  const course = await getCourseDetails(courseId);
  const loggedinUser = await getLoggedInUser();

  const updatedModules = await Promise.all(course?.modules.map(async (module) => {
    const moduleId = module._id.toString();
    const lessons = module?.lessonIds;

    const updatedLessons = await Promise.all(lessons.map(async (lesson) => {
      const lessonId = lesson._id.toString();
      const watch = await Watch.findOne({ lesson: lessonId, module: moduleId, user: loggedinUser.id }).lean();
      if (watch?.state === 'completed') {
        lesson.state = 'completed';
      }
      return lesson;
    }))
    return module;
  }));

  //console.log(updatedModules);

  const updatedallModules = sanitizeData(updatedModules)


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

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">Reactive Accelerator</h1>
          {/* Check purchase */}
          {
            <div className="mt-10">
              <CourseProgress variant="success" value={80} />
            </div>
          }
        </div>

        <SidebarModules courseId={courseId} modules={updatedallModules} />

        <div className="w-full px-6">
          <GiveReview />
          <DownloadCertificate />
        </div>



      </div>

    </>
  );
};