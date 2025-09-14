import { makeAutoObservable } from 'mobx';
import { ILocalStorageCodec } from 'shared/LocalStorageStrategy/index.ts';
import LocalStorageStrategy from 'shared/LocalStorageStrategy/index.ts';
import { Primitive } from 'types/global.ts'

export class PersistableStore<T extends Object | Array<unknown> | Set<unknown> | Primitive> {
  _state: T;
  _key: string;
  _strategy: LocalStorageStrategy<T>;
  _codec: ILocalStorageCodec<T>;

  constructor(initialState: T, key: string, codec: ILocalStorageCodec<T> = JSON) {

    this._key = key;
    this._codec = codec;
    this._strategy = new LocalStorageStrategy<T>(this._codec);


    const storedValue = this._strategy.get(this._key);
    this._state = storedValue !== null ? storedValue : initialState;
    makeAutoObservable(this);
  }


  get state(): T {
    return this._state;
  }


  set state(newValue: T) {
    this._state = newValue;
    this._strategy.set(this._key, newValue);
  }


  updateState(updater: (prevState: T) => T): void {
    this.state = updater(this._state);
  }
}