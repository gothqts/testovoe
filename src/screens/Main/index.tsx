import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import TaskPanel from 'screens/Main/components/TaskPanel'
import Button from 'shared/Button'
import { useState } from 'react'
import TaskFormStore from 'stores/TaskFormStore'
import tasksStore from 'stores/TasksStoreCtrl'
import UpdateTaskModal from 'screens/Main/components/UpdateTaskModal'

const taskFormCtrl = new TaskFormStore()

const Main = observer(() => {

  const [isModalOpen, setModalIsOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    tasksStore.createTask({
      title: taskFormCtrl.title,
      parentId: taskFormCtrl.parentId,
      description: taskFormCtrl.description,

    })
    taskFormCtrl.resetFormState()
    setModalIsOpen(false)
  }

  return (

    <div className="h-screen flex">
      <div className="flex-1 p-[36px]">
        <div className="flex flex-col gap-5">
          <Button
            className="self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setModalIsOpen(true)}
          >
            Добавить
          </Button>
        {
          isModalOpen && (
            <UpdateTaskModal setIsModalOpen={setModalIsOpen} handleSubmit={handleSubmit} taskFormCtrl={taskFormCtrl} />
          )
        }
        <TaskPanel />
        </div>
      </div>
      <Outlet />
    </div>
  )
})

export default Main