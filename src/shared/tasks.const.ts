export interface ITaskData {
  title: string;
  description: string;
}

export const tasks = [
  {
    id: '1',
    data: {
      title: 'Задача 1',
      description: 'Описание задачи 1',
    },
    parentId: null,
  },
  {
    id: '12',
    data:{
      title: 'Задача 1.2',
      description: 'Описание задачи 1.2',
    },
    parentId: '1',
  },
  {
    id: '121',
    data:{
      title: 'Задача 1.2.1',
      description: 'Описание задачи 1.2.2',
    },
    parentId: '12',
  },
  {
    id: '13',
    data:{
      title: 'Задача 1.3',
      description: 'Описание задачи 1.3',
    },
    parentId: '1',
  },
  {
    id: '2',
    data:{
      title: 'Задача 2',
      description: 'Описание задачи 2',
    },
    parentId: null,
  },
  {
    id: '3',
    data:{
      title: 'Задача 3',
      description: 'Описание задачи 3',
    },
    parentId: null,
  },
]