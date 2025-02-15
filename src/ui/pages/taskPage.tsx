import { NewTask } from "@/domain/task/task";
import TaskList from "@/ui/components/taskList";
import { useTask } from "@/ui/hooks/useTasks";

const TaskPage = () => {
  const { tasks, handleCreateTask, handleRemoveTask, handleUpdateTask } =
    useTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentForm = e.target as HTMLFormElement;
    const formData = new FormData(currentForm);
    const userId: number = 1;
    const title: string = formData.get("taskTitle") as string;
    const newtask: NewTask = {
      userId: userId,
      title: title,
      completed: false,
    };
    handleCreateTask(newtask, currentForm);
  };

  return (
    <section className="bg-black min-h-screen text-white flex flex-col justify-center items-center gap-10 p-5">
      <h1 className="text-4xl font-bold">TODO App</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="taskTitle"
          className="p-4 text-xl rounded-md text-white"
          type="text"
          placeholder="give me a task..."
          required
        />
        <button className="bg-blue-500 font-bold text-xl p-2 px-6 rounded-md max-w-max mx-auto">
          Add Task
        </button>
      </form>

      <TaskList
        tasks={tasks}
        onRemoveTask={handleRemoveTask}
        onUpdateTask={handleUpdateTask}
      />
    </section>
  );
};
export default TaskPage;
