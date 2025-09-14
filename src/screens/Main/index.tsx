import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import { ITaskData } from 'shared/tasks.const.ts'
import { ITreeGroup } from 'shared/Tree/tree.types.ts'
import TaskPanel from 'screens/Main/components/TaskPanel'

export type TreeItem = ITreeGroup<ITaskData>;


const Main = observer(() => {
  return (
    <div className="h-screen flex">
      <div className="flex-1 p-[36px]">
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Поиск"
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Добавить
          </button>
        </div>
        <TaskPanel />
      </div>
      <Outlet />
    </div>
  )
})

export default Main