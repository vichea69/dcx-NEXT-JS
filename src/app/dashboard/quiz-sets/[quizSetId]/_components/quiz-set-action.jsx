"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { changeQuizPublishState, deleteQuiz } from "@/app/actions/quiz";
import { toast } from "sonner";

export const QuizSetAction = ({ quizSetId, quiz, quizId }) => {

  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(quiz);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    try {

      switch (action) {
        case "change-active": {
          const activeState = await changeQuizPublishState(quizSetId);
          setPublished(!activeState)
          toast.success("The Quiz has been updated");
          router.refresh();
          break;
        }
        case "delete": {
          if (published) {
            toast.error("A published quiz can not be deleted. First Unpublish it, Then delete");
          } else {
            await deleteQuiz(quizSetId, quizId);
            toast.success("Quiz has been deleted");
            router.push(`/dashboard/quiz-sets`);
          }
          break;
        }
        default: {
          throw new Error("Invalid Action");
        }
      }
    } catch (e) {
      toast.error(`Error: ${e.message}`);
    }
  }



  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="sm" onClick={() => setAction("change-active")}>
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button type="submit" name="action" value="delete" size="sm" onClick={() => setAction("delete")}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};