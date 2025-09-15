import { makeAutoObservable } from 'mobx'
import { ITreeGroup } from 'shared/Tree/tree.types.ts'
import {
  ITaskData
} from 'stores/TasksStoreCtrl'


class Index {
  title: string
  description: string
  parentId: string | null


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

export default Index