import IStoreTreeStrategy from './strategy.interface.ts'

export interface ILocalStorageCodec<T> {
  parse: (s: string) => T
  stringify: (obj: T) => string
}


class LocalStorageStrategy<T extends unknown> implements IStoreTreeStrategy<T> {
  private codec: ILocalStorageCodec<T>

  constructor(codec: ILocalStorageCodec<T> = JSON) {
    this.codec = codec
  }

  get(key: string) {
    return this.codec.parse(localStorage.getItem(key))
  }

  set(key: string, state: T) {
    localStorage.setItem(key, this.codec.stringify(state))
  }
}

export default LocalStorageStrategy
