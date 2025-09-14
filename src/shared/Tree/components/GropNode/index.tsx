import {
  ITreeGroup,
  ITreePluginsProps,
  ITreeStyling,
} from 'shared/Tree/tree.types.ts'
import { JSX, memo } from 'react'
import Dropdown from 'shared/Dropdown'
import { observer } from 'mobx-react-lite'

interface IGroupNodeProps<Group extends Record<string, any>> extends ITreePluginsProps {
  group: ITreeGroup<Group>,
  renderGroup: (group: ITreeGroup<Group>, isHasChildren: boolean) => JSX.Element | string,
  groupsMap: Record<string, ITreeGroup<Group>[]>
  onClickGroup?: (group: Group) => void,
  isRoot?: boolean,
  styling?: ITreeStyling
}

const GroupNode = observer(<Group extends Record<string, any>>(props: IGroupNodeProps<Group>) => {

    const isOpen = props.expandCtrl ? props.expandCtrl.expanded.has(props.group.id) : true
    const normalizedGroups = props.groupsMap[props.group.id] || []
    const isHasChildren = normalizedGroups.length > 0


    const handleClickGroup = () => {
      if (isHasChildren) {
        props.expandCtrl.toggleItem(props.group.id)
      }
      if (props.onClickGroup) {
        props.onClickGroup(props.group.data)
      }
    }

    const renderGroupChildren = () => {

      if (isHasChildren === false) return null

      return (
        <Dropdown open={isOpen}>
          {
            normalizedGroups.map((group) => (
              <GroupNode
                {...props}
                isRoot={false}
                group={group}
                key={group.id}
              />
            ))
          }
        </Dropdown>
      )
    }

    return (
      <div className={props.styling?.groupClassName}>
        <div onClick={handleClickGroup}>
          {props.renderGroup(props.group, isHasChildren)}
        </div>

        {renderGroupChildren()}
      </div>
    )
  },
)

export default memo(GroupNode)