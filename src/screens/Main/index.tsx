import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import TaskPanel from 'screens/Main/components/TaskPanel'
import Button from 'shared/Button'
import { useState } from 'react'
import Modal from 'shared/Modal'
import TaskForm from 'screens/Main/components/TaskForm'
import TaskFormStore from 'stores/TaskFormStore'
import tasksStore from 'stores/TasksStoreCtrl'

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
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Поиск"
            className="border rounded px-3 py-2 flex-1"
          />
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setModalIsOpen(true)}
          >
            Добавить
          </Button>
        </div>
        {
          isModalOpen && (
            <Modal
              id="updateTask"
              title="Добавить задачу"
              onClose={() => setModalIsOpen(false)}
            >
              <form
                className="flex flex-col gap-[24px] w-full"
                onSubmit={handleSubmit}
              >
                <TaskForm
                  actionType='create'
                  taskCtrl={taskFormCtrl}
                />

                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Создать
                </Button>
              </form>
            </Modal>
          )
        }
        <TaskPanel />
      </div>
      <Outlet />
    </div>
  )
})

export default Main