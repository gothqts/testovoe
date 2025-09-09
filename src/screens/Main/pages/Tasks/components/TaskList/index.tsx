import Task from "screens/Main/pages/Tasks/components/Task";
import { ITask } from "types/global.ts";

interface ITaskListProps {
    tasks: ITask[];
}

const TaskList = ({ tasks }: ITaskListProps) => {
    return (
        <div className='flex-column gap-5 p-10'>
            {tasks.map((task) => (
                <div key={task.id}>
                    <Task task={task} />
                    {task.children && task.children.length > 0 && (
                        <TaskList tasks={task.children} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskList;