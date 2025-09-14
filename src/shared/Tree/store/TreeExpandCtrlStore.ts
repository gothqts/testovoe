import { PersistableStore } from 'stores/PersistableStore'
import { makeAutoObservable } from 'mobx'
import setStateUpdaters from 'utils/set.stateUpdaters'
import LocalStorageSetCodec
  from 'shared/LocalStorageStrategy/codecs/localStorageSetCodec.ts'

class TreeExpandCtrlStore<T extends string | number> {
  treeKey: string
  groups: Record<string, any>[]
  persistableInstance: InstanceType<typeof PersistableStore<Set<T>>>

  constructor(
    treeKey: string,
    groups: Record<string, any>[] = [],
  ) {
    this.treeKey = treeKey
    this.groups = groups


    this.persistableInstance = new PersistableStore<Set<T>>(
      new Set<T>(),
      `${treeKey}/expanded`,
      new LocalStorageSetCodec<T>()
    )

    makeAutoObservable(this)
  }

  get expanded(): Set<T> {
    return this.persistableInstance.state
  }


  setExpanded = (value: Set<T> | ((prev: Set<T>) => Set<T>)) => {
    if (typeof value === 'function') {
      this.persistableInstance.updateState(value)
    } else {
      this.persistableInstance.state = value
    }
  }

  toggleItem = (item: T) => {
    setStateUpdaters.createIfNotExistsRemoveIfExists(this.setExpanded, item)
  }


  isExpanded = (item: T): boolean => {
    return this.expanded.has(item)
  }

}

export default TreeExpandCtrlStore