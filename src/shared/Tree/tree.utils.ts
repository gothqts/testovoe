import { ITreeGroup } from './tree.types'
import objectUtils from 'utils/object.utils'


const buildGroupIdToGroupsMap = <T extends Record<string, any>>(groups: ITreeGroup<T>[]) => {
  return objectUtils.arrToKeyArray(groups, 'parentId')
}


const treeUtils = {
  buildGroupIdToGroupsMap,
}
export default treeUtils
