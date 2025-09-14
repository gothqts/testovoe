import { CSSProperties, JSX } from 'react'
import TreeExpandCtrlStore from 'shared/Tree/store/TreeExpandCtrlStore.ts'


export interface ITreePluginsProps {
  expandCtrl?: InstanceType<typeof TreeExpandCtrlStore>
}

export interface ITreeStyling{
  groupClassName?: string,
  groupStyle?: CSSProperties,
}
export interface ITreeGroup<T extends Record<string, any>> {
  id: string;
  parentId: string | null;
  data: T;
}


export interface ITreeProps<Group extends Record<string, any>> extends ITreePluginsProps{
  groups: ITreeGroup<Group>[];
  renderGroup: (group: ITreeGroup<Group>, isHasChildren: boolean) => JSX.Element | string;
  onClickGroup?: (group: Group) => void;
  styling: ITreeStyling;
}