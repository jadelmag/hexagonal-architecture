import { Task } from "@/domain/task/task";

interface Props {
  tasks: Task[];
  onRemoveTask: (id: number) => void;
  onUpdateTask: (task: Task) => void;
}

const TaskList = ({ tasks, onRemoveTask, onUpdateTask }: Props) => {
  return (
    <div className="grid gap-4 w-full max-w-md">
      {tasks.map((task) => (
        <article
          key={task.id}
          className={`p-4 rounded-md flex justify-between gap-2 ${
            task.completed ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          <h2 className={`font-bold ${task.completed && "line-through"}`}>
            {task.title}
          </h2>
          <div className="flex items-center gap-2 ">
            <input
              className="h-6 aspect-square cursor-pointer"
              onChange={() => onUpdateTask(task)}
              type="checkbox"
              checked={task.completed}
            />
            <button onClick={() => onRemoveTask(task.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
              </svg>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
export default TaskList;