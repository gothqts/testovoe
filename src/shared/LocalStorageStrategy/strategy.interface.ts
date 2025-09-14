export type AnyObject = Record<string, any>

type getter<T extends AnyObject> = (key: string) => T
type asyncGetter<T extends AnyObject> = (key: string) => Promise<T>

type setter<T extends AnyObject> = (key: string, state: T) => void
type asyncSetter<T extends AnyObject> = (key: string, state: T) => Promise<void>

export interface IStoreTreeStrategy<T extends AnyObject> {
  get: getter<T> | asyncGetter<T>
  set: setter<T> | asyncSetter<T>
}

export default IStoreTreeStrategy
