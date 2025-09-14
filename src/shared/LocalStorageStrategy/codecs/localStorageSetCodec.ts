import { ILocalStorageCodec } from '../index'

/**
 * Кодек для использования Set с репликацией в localStorage
 */
class LocalStorageSetCodec<T> implements ILocalStorageCodec<Set<T>> {
  public stringify(set: Set<T>): string {
    return JSON.stringify(Array.from(set))
  }

  public parse(s: string): Set<T> {
    return new Set<T>(JSON.parse(s))
  }
}

export default LocalStorageSetCodec