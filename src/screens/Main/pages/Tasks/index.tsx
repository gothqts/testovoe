import TaskList from "screens/Main/pages/Tasks/components/TaskList";
import {ITask} from "types/global.ts";

const Tasks = () => {
    const tasks: ITask[] = [
        {
            id: 1,
            title: 'Задача 1',
            children: [
                {
                    id: 11,
                    title: 'Задача 1.1',
                    children: [
                        {
                            id: 111,
                            title: 'Задача 1.1.1'
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Задача 2',
            children: [
                {
                    id: 21,
                    title: 'Задача 2.1',
                },
                {
                    id: 22,
                    title: 'Задача 2.2',
                }
            ]
        },
        {
            id: 3,
            title: 'Задача 3',
            children: [
                {
                    id: 31,
                    title: 'Задача 3.1',
                },
                {
                    id: 32,
                    title: 'Задача 3.2',
                }
            ]
        }
    ]
    return (
        <div className='flex-1'>
            <TaskList tasks={tasks}/>
        </div>
    );
};

export default Tasks;