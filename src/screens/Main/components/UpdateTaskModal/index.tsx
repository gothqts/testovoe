import TaskForm from 'screens/Main/components/TaskForm'
import Button from 'shared/Button'
import Modal from 'shared/Modal'
import TaskFormCtrl from 'stores/TaskFormStore'

interface IUpdateTaskModalProps{
  setIsModalOpen: (isOpen: boolean) => void,
  taskFormCtrl: InstanceType<typeof TaskFormCtrl>
  handleSubmit: (e) => void,
}
const UpdateTaskModal = ({setIsModalOpen, taskFormCtrl, handleSubmit}: IUpdateTaskModalProps) => {
  return (
    <Modal
      id="updateTask"
      title="Добавить задачу"
      onClose={() => setIsModalOpen(false)}
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

export default UpdateTaskModal