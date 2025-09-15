import { observer } from 'mobx-react-lite'
import taskStoreCtrl
  from 'screens/Main/components/TaskPanel/stores/TasksStoreCtrl'
import TaskForm from 'screens/Main/components/TaskForm'
import Button from 'shared/Button'
import TaskFormStore from 'screens/Main/components/TaskForm/TaskFormStore.ts'
import tasksStore from 'stores/TasksStore'
import { useState } from 'react'
import Modal from 'shared/Modal'


const { getSelectedTask } = taskStoreCtrl


const TaskContent = observer(() => {

  const selectedTask = getSelectedTask()
  const taskCtrl = new TaskFormStore(selectedTask)


  const handleSubmit = (e) => {
    e.preventDefault()

    tasksStore.updateTask({
      title: taskCtrl.title,
      description: taskCtrl.description,
    }, selectedTask.id)

    setModalIsOpen(false)
  }

  const [isModalOpen, setModalIsOpen] = useState(false)

  return (
    <div className="flex-1 bg-[#DCE0E1] p-[36px]">
      <div className="flex flex-col justify-center items-center gap-[24px]">
        {
          selectedTask && (
            <>
              <span className="text-3xl">{selectedTask?.data.title}</span>
              <span className="text-xl">{selectedTask?.data.description}</span>
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setModalIsOpen(true)}
              >
                Редактировать
              </Button>
              <Button type='button' className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={()=>tasksStore.deleteTask(selectedTask.id)}>
                Удалить
              </Button>
            </>
          )
        }

        {
          isModalOpen && (
            <Modal
              id="updateTask"
              onClose={() => setModalIsOpen(false)}
              title="Редактирование задачи"
            >
              <form
                className="flex flex-col gap-[24px] w-full"
                onSubmit={handleSubmit}
              >
                <TaskForm
                  actionType="update"
                  taskCtrl={taskCtrl}
                />
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Сохранить
                </Button>
              </form>
            </Modal>
          )
        }


      </div>
    </div>
  )
})

export default TaskContent