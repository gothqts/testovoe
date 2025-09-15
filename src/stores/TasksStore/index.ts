import { makeAutoObservable } from 'mobx'
import { ITaskData } from 'shared/tasks.const.ts'
import { ITreeGroup } from 'shared/Tree/tree.types.ts'
import { v4 as uuidv4 } from 'uuid';


interface ICreateTaskData{
  title: string,
  description: string,
  parentId?: string | null,
}

interface IUpdateTaskData{
  title: string,
  description: string,
}

class TasksStore {
  tasksGroups: ITreeGroup<ITaskData>[] = []


  constructor() {
    makeAutoObservable(this)
  }

  createTask = (data: ICreateTaskData) => {
    const newTaskGroup = {
      id: uuidv4(),
      data: {
        title: data.title,
        description: data.description,
      },
      parentId: data.parentId || null,
    }
    this.tasksGroups.push(newTaskGroup)
  }

  deleteTask = (id: string) => {
    console.log(id)
    this.tasksGroups = this.tasksGroups.filter((task) => task.id !== id)
    console.log(this.tasksGroups)
  }

  updateTask = (data: IUpdateTaskData, id: string) => {
    this.tasksGroups = this.tasksGroups.map(task => {
      if (task.id === id) {
        return {
          ...task,
          data: {
            ...task.data,
            title: data.title,
            description: data.description,
          }
        }
      }
      return task
    })
  }

}

export default new TasksStore()