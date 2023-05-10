import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CreateTaskInput, CreateTaskDocument, CreateTaskMutation } from '../../generated/graphql'
import { addTimeZone } from '../time/FormatDateTime'
import styles from './styles/CreateTask.module.css'

const CreateTask = () => {
  const [task, setTask] = useState<CreateTaskInput>({
    title: '',
    content: '',
    schedule: '',
  })
  const [createTask, { error }] = useMutation<CreateTaskMutation>(CreateTaskDocument)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTask(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      await createTask({
        variables: {
          input: {
            title: task.title,
            content: task.content,
            schedule: addTimeZone(task.schedule!)
          }
        }
      })
      alert('作成しました')
      router.push('/')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div>
        <input type="text" name="title" value={task.title!} placeholder={'タイトル'} onChange={handleChange} className={styles.title} />
      </div>
      <div>
        <textarea name="content" value={task.content!} placeholder={'内容'} onChange={handleChange} className={styles.content} />
      </div>
      <div>
        <input type="datetime-local" name="schedule" value={task.schedule!} onChange={handleChange} />
      </div>
      <div className={styles.button}>
        <button onClick={handleSave}>作成</button>
      </div>
    </div>
  )
}

export default CreateTask
