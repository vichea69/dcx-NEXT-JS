import { getAllQuizSets } from "@/queries/quizzes";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";


const QuizSets = async () => {

  const quzSetsall = await getAllQuizSets();
  const mappedQuizSets = quzSetsall.map(q => {
    return {
      id: q.id,
      title: q.title,
      isPublished: q.active,
      totalQuiz: q.quizIds.length,
    }
  })

  //console.log(mappedQuizSets);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={mappedQuizSets} />
    </div>
  );
};

export default QuizSets;