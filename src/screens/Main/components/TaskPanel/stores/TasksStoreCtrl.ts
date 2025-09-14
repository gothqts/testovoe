import { makeAutoObservable } from 'mobx'
import { ITaskData } from 'shared/tasks.const.ts'
import { ITreeGroup } from 'shared/Tree/tree.types.ts'

export class TasksStoreCtrl {
  allGroups: ITreeGroup<ITaskData>[] = []
  selectedTasks: Set<string> = new Set()

  constructor(initialGroups: ITreeGroup<ITaskData>[] = []) {
    this.allGroups = initialGroups

    makeAutoObservable(this)
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

export default TasksStoreCtrl