import { makeAutoObservable, reaction,} from 'mobx';


class TreeExpandCtrlStore<T extends string | number> {
  treeKey: string;
  groups: Record<string, any>[];
  expanded: Set<T>;

  constructor(treeKey: string, groups: Record<string, any>[] = []) {
    this.treeKey = treeKey;
    this.groups = groups;


    const stored = localStorage.getItem(`${treeKey}/expanded`);
    this.expanded = stored ? new Set(JSON.parse(stored)) : new Set<T>();

    makeAutoObservable(this);


    reaction(
      () => this.toJSExpanded(),
      (expanded) => {
        localStorage.setItem(`${treeKey}/expanded`, JSON.stringify(expanded));
      },
      { delay: 100 }
    );
  }


  private toJSExpanded(): T[] {
    return Array.from(this.expanded);
  }



  toggleItem = (item: T): void => {
    const newSet = new Set(this.expanded);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    this.expanded = newSet;
  };


  isExpanded = (item: T): boolean => {
    return this.expanded.has(item);
  };


}

export default TreeExpandCtrlStore;