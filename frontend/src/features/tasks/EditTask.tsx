import { NextPage } from 'next'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetTaskDocument, GetTaskQuery } from '../../generated/graphql'
import { UpdateTaskInput, UpdateTaskDocument, UpdateTaskMutation,  } from '../../generated/graphql'
import styles from './styles/EditTask.module.css'

type Props = {
  id: string
}

const EditTask: NextPage<Props> = ({ id }) => {
  const [task, setTask] = useState<UpdateTaskInput>({
    id: '',
    title: '',
    content: '',
    schedule: '',
    done: null,
  })
  const { loading, data } = useQuery<GetTaskQuery>(GetTaskDocument, {
    variables: { id },
    skip: !id,
  })
  const [updateTask, { error }] = useMutation<UpdateTaskMutation>(UpdateTaskDocument)
  const router = useRouter()

  useEffect(() => {
    if (!data || !data.getTask) return
    setTask({
      id: data.getTask.id,
      title: data.getTask.title!,
      content: data.getTask.content!,
      schedule: data.getTask.schedule!,
      done: data.getTask.done,
    })
  }, [data])

  if (loading) return <p>Loading...</p>

  const formatDateTime = (dateTime?: string) => {
    const date = dateTime ? new Date(dateTime) : new Date()
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day}T${hour}:${minute}`
  }

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
      await updateTask({
        variables: {
          id: task.id,
          title: task.title,
          content: task.content,
          schedule: addTimeZone(task.schedule!),
          done: task.done,
        }
      })
      alert('更新しました')
      router.push('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <div className={`${styles.form} ${styles.title}`}>
        <label htmlFor="title">タイトル</label>
        <input type="text" name="title"  value={task.title!} onChange={handleChange} />
      </div>
      <div className={`${styles.form} ${styles.content}`}>
        <label htmlFor="content">内容</label>
        <textarea name="content" value={task.content!} onChange={handleChange} />
      </div>
      <div className={`${styles.form} ${styles.schedule}`}>
        <label htmlFor="schedule">予定日</label>
        <input type="datetime-local" name="schedule" value={formatDateTime(task.schedule!)} onChange={handleChange} />
      </div>
      <button onClick={handleSave}>更新</button>
    </div>

  )
}

export default EditTask
