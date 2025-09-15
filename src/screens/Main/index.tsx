import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import TaskPanel from 'screens/Main/components/TaskPanel'
import Button from 'shared/Button'
import { useState } from 'react'
import Modal from 'shared/Modal'
import TaskForm from 'screens/Main/components/TaskForm'
import TaskFormStore from 'screens/Main/components/TaskForm/TaskFormStore.ts'
import tasksStore from 'stores/TasksStore'

const taskCtrl = new TaskFormStore()

const Main = observer(() => {

  const [isModalOpen, setModalIsOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    tasksStore.createTask({
      title: taskCtrl.title,
      parentId: taskCtrl.parentId,
      description: taskCtrl.description,

    })
    taskCtrl.resetFormState()
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
                  taskCtrl={taskCtrl}
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