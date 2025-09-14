import { Primitive } from '../types/global'

const createIfNotExistsRemoveIfExists = <T extends Primitive>(setter: (value: Set<T> | ((prev: Set<T>) => Set<T>)) => void, item: T) => {
  setter((prev) => {
    const newSet = new Set(prev)
    if (newSet.has(item)) {
      newSet.delete(item)
    } else {
      newSet.add(item)
    }
    return newSet
  })
}

const setStateUpdaters = { createIfNotExistsRemoveIfExists }

export default setStateUpdaters