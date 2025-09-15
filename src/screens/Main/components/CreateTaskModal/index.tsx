import TaskForm from 'screens/Main/components/TaskForm'
import Button from 'shared/Button'
import Modal from 'shared/Modal'
import TaskFormCtrl from 'stores/TaskFormStore'

interface ICreateTaskModalProps {
  setIsModalOpen: (isOpen: boolean) => void,
  taskFormCtrl: InstanceType<typeof TaskFormCtrl>
  handleSubmit: (e) => void,
}
const CreateTaskModal = ({setIsModalOpen, taskFormCtrl, handleSubmit}: ICreateTaskModalProps ) => {
  return (
    <Modal
      id="updateTask"
      onClose={() => setIsModalOpen(false)}
      title="Редактирование задачи"
    >
      <form
        className="flex flex-col gap-[24px] w-full"
        onSubmit={handleSubmit}
      >
        <TaskForm
          actionType="update"
          taskCtrl={taskFormCtrl}
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

export default CreateTaskModal