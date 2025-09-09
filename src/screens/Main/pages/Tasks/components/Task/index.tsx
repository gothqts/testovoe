import {ITask} from "types/global.ts";

interface ITaskProps {
    task: ITask
}

const Task = ({task}: ITaskProps) => {
    return (
        <div key={task.id} className='flex gap-5 items-center text-2xl '>
            <span>{task.title}</span>
            <input type='checkbox' />
        </div>
    );
};

export default Task;