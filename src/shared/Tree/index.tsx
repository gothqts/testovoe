import { ITreeProps } from 'shared/Tree/tree.types.ts'
import { useMemo } from 'react'
import GroupNode from 'shared/Tree/components/GropNode'
import treeUtils from 'shared/Tree/tree.utils.ts'
import { observer } from 'mobx-react-lite'

const Tree =observer( (props: ITreeProps<Record<string, any>>) => {

  const computedGroups = useMemo(() => {
    const rootGroups = props.groups.filter((g) => g.parentId === null)
    const groupsMap = treeUtils.buildGroupIdToGroupsMap(props.groups)


    return { rootGroups, groupsMap }
  }, [props.groups])


  return (
    <div>
      {computedGroups.rootGroups.map(group => (
        <GroupNode
          expandCtrl={props.expandCtrl}
          groupsMap={computedGroups.groupsMap}
          onClickGroup={props.onClickGroup}
          isRoot={true}
          key={group.id}
          group={group}
          renderGroup={props.renderGroup}
          styling={props.styling}
        />
      ))}
    </div>
  )
}
)
export default Tree