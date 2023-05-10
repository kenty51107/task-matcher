import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CreateTaskInput, CreateTaskDocument, CreateTaskMutation } from '../../generated/graphql'

const CreateTask = () => {
  const [task, setTask] = useState<CreateTaskInput>({
    title: '',
    content: '',
    schedule: '',
  })
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument)
  const router = useRouter()

  const addTimeZone = (dateTime: string) => {
    return `${dateTime}:00+09:00`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTask(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      const scheduleAddedTimeZone = addTimeZone(task.schedule!)
      await createTask({
        variables: {
          title: task.title,
          content: task.content,
          schedule: scheduleAddedTimeZone,
        }
      })
      alert('作成しました')
      router.push('/')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
      <div>
        <label htmlFor="title">タイトル</label>
        <input type="text" name="title" value={task.title!} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="content">内容</label>
        <textarea value={task.content!} name="content" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="schedule">予定日</label>
        <input type="datetime-local" name="schedule" value={task.schedule!} onChange={handleChange} />
      </div>
      <button onClick={handleSave}>作成</button>
    </div>
  )
}

export default CreateTask
