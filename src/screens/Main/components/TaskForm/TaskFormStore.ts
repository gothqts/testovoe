import { makeAutoObservable } from 'mobx'
import { ITreeGroup } from 'shared/Tree/tree.types.ts'
import { ITaskData } from 'shared/tasks.const.ts'

class TaskFormStore {
  title: string
  description: string
  parentId: string | null

  actionType: 'create' | 'update'

  constructor(taskData?: ITreeGroup<ITaskData>) {
    this.title = taskData?.data.title || ''
    this.description = taskData?.data.description || ''
    this.parentId = taskData?.parentId || null
    makeAutoObservable(this)
  }

  handleChange = (value: string, name: string) => {
    this[name] = value
  }


  resetFormState = () => {
    this.title = ''
    this.description = ''
    this.parentId = null
  }
}

export default TaskFormStore