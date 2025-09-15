import { observer } from 'mobx-react-lite'
import Checkbox from 'shared/Checkbox'
import Tree from 'shared/Tree'
import tasksStoreCtrl, { ITaskData } from 'stores/TasksStoreCtrl'
import FlippingArrow from 'shared/FlippingArrow'
import TreeExpandCtrlStore from 'shared/Tree/store/TreeExpandCtrlStore.ts'
import { ITreeGroup } from 'shared/Tree/tree.types.ts'


export type TreeItem = ITreeGroup<ITaskData>;

const expandCtrl = new TreeExpandCtrlStore('tasks', tasksStoreCtrl.treeGroups )


const TaskPanel = observer(() => {

  const {
    treeGroups,
    handleSelectTask,
    isChecked,
    setSelectedTask,
  } = tasksStoreCtrl



  const renderGroups = (group: TreeItem, isHasChildren: boolean) => {
    const isOpen = expandCtrl.isExpanded(group.id)

    return (
      <div
        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        onClick={() => setSelectedTask(group.id)}>
        {isHasChildren ? (
          <FlippingArrow
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            isOpen={isOpen}
          />
        ) : <div className="w-5 h-5"></div>}
        <Checkbox
          checked={isChecked(group.id)}
          name={group.id}
          onChange={(val, name) => handleSelectTask(val, name)}
          label={group.data.title}
        />
      </div>
    )
  }

  if (treeGroups?.length > 0) return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <Tree
        groups={treeGroups}
        renderGroup={renderGroups}
        expandCtrl={expandCtrl}
        styling={{ groupClassName: 'pl-[16px]' }}
      />
    </div>

  )
})

export default TaskPanel