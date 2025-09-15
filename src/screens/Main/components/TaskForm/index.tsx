import TextInput from 'shared/TextInput'
import { observer } from 'mobx-react-lite'
import TaskFormStore from 'screens/Main/components/TaskForm/TaskFormStore.ts'
import SelectDropdown from 'shared/Select'
import tasksStore from 'stores/TasksStore/index.ts'


interface ITaskFormProps{
  taskCtrl: InstanceType<typeof TaskFormStore>
  actionType: 'update' | 'create',
}


const TaskForm = observer((props: ITaskFormProps) => {

  const options = tasksStore.tasksGroups.map((g)=>({
    title: g.data.title,
    value: g.id,
  }))


  return (
    <div className='flex flex-col gap-5'>
      <TextInput
        label='Заголовок задачи'
        placeholder='Введите заголовок задачи'
        name='title'
        value={props.taskCtrl.title}
        onChange={props.taskCtrl.handleChange}
      />
      <TextInput
        label='Описание задач'
        placeholder='Введите описание'
        onChange={props.taskCtrl.handleChange}
        value={props.taskCtrl.description}
        name='description'
      />
      {
        options?.length > 0 && props.actionType==='create' && (
          <SelectDropdown
            name='parentId'
            options={options}
            onSelect={props.taskCtrl.handleChange}
            selectedOption={props.taskCtrl.parentId}
            label='Предок задачи (опционально)'
            title='Выберите'/>
        )
      }

    </div>
  )


})

export default TaskForm