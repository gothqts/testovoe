import { makeAutoObservable, reaction } from 'mobx'
import { ITreeGroup } from 'shared/Tree/tree.types.ts'
import { v4 as uuidv4 } from 'uuid'

export interface ITaskData{
  title: string,
  description: string,
}

interface ICreateTaskData {
  title: string,
  description: string,
  parentId?: string | null,
}

interface IUpdateTaskData {
  title: string,
  description: string,
}


export class TasksStoreCtrl {
  allGroups: ITreeGroup<ITaskData>[] = []
  selectedTasks: Set<string> = new Set()
  selectedTask: ITreeGroup<ITaskData> | null



  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();

    reaction(
      () => JSON.stringify(this.allGroups),
      allGroupsJson => {
        localStorage.setItem('tasksGroups', allGroupsJson);
      }
    );
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
    this.allGroups.push(newTaskGroup)
  }


  loadFromLocalStorage() {
    const todos = localStorage.getItem('tasksGroups');
    if (todos) {
      this.allGroups = JSON.parse(todos);
    }
  }
  deleteTask = (id: string) => {
    const idsToDelete = new Set<string>([id])
    let currentLevel = [id]


    while (currentLevel.length > 0) {
      const nextLevel: string[] = []

      for (const parentId of currentLevel) {
        const children = this.allGroups
          .filter(task => task.parentId === parentId)
          .map(task => task.id)

        children.forEach(childId => idsToDelete.add(childId))
        nextLevel.push(...children)
      }

      currentLevel = nextLevel

    }

    this.allGroups = this.allGroups.filter(task => !idsToDelete.has(task.id))

    if (this.selectedTask && idsToDelete.has(this.selectedTask.id)) {
      this.selectedTask = null
    }

    idsToDelete.forEach(idToDelete => {
      this.selectedTasks.delete(idToDelete)
    })
  }


  updateTask = (data: IUpdateTaskData, id: string) => {
    this.allGroups = this.allGroups.map(task => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          data: {
            title: data.title,
            description: data.description,
          }
        }

        if (this.selectedTask?.id === id) {
          this.selectedTask = updatedTask
        }

        return updatedTask
      }
      return task
    })
  }

  setSelectedTask = (id: string) => {
    const task = this.allGroups.find(group => group.id === id)
    this.selectedTask = task || null
  }



  getSelectedTask = () => {
    return this.selectedTask
  }


  private findAllChildren = (id: string): ITreeGroup<ITaskData>[] => {
    const children = this.allGroups.filter(item => item.parentId === id)
    const nestedChildren = children.flatMap(child => this.findAllChildren(child.id))
    return [...children, ...nestedChildren]
  }


  private findAllParents = (parentId: string | null): ITreeGroup<ITaskData>[] => {
    if (!parentId) return []

    const parents = this.allGroups.filter(item => item.id === parentId)
    const nestedParents = parents.flatMap(parent => this.findAllParents(parent.parentId))
    return [...parents, ...nestedParents]
  }


  private updateParents = (parentId: string | null, selectedTasks: Set<string>) => {
    if (!parentId) return

    const parent = this.allGroups.find(g => g.id === parentId)
    if (!parent) return

    const parentChildren = this.findAllChildren(parentId)
    const allChildrenSelected = parentChildren.every(child => selectedTasks.has(child.id))

    if (allChildrenSelected) {
      selectedTasks.add(parentId)
    } else {
      selectedTasks.delete(parentId)
    }

    this.updateParents(parent.parentId, selectedTasks)
  }

  handleSelectTask = (val: boolean, id: string) => {

    const foundGroup = this.allGroups.find(g => g.id === id)

    if (!foundGroup) return

    const selectedTasks = new Set<string>(this.selectedTasks)

    if (val) {
      selectedTasks.add(id)
    } else {
      selectedTasks.delete(id)
    }


    const children = this.findAllChildren(id)
    children.forEach(child => {
      if (val) {
        selectedTasks.add(child.id)
      } else {
        selectedTasks.delete(child.id)
      }
    })

    this.updateParents(foundGroup.parentId, selectedTasks)
    this.selectedTasks = selectedTasks
  }

  isChecked = (id: string): boolean => {
    const foundGroup = this.allGroups.find(g => g.id === id)

    if (foundGroup?.parentId) {
      return this.selectedTasks.has(id)
    } else {

      const children = this.findAllChildren(id)

      if (children.length === 0) return this.selectedTasks.has(id)

      return children.every(child => this.selectedTasks.has(child.id))

    }
  }

  get treeGroups(): ITreeGroup<ITaskData>[] {
    return this.allGroups.map(group => ({
      id: group.id,
      parentId: group.parentId,
      data: group.data,
    }))
  }

}

export default new TasksStoreCtrl()