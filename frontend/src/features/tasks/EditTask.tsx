import { NextPage } from 'next'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetTaskDocument, GetTaskQuery } from '../../generated/graphql'
import { UpdateTaskInput, UpdateTaskDocument, UpdateTaskMutation,  } from '../../generated/graphql'
import { formatDateTime } from '../time/FormatDateTime'
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
          input: {
            id: task.id,
            title: task.title,
            content: task.content,
            schedule: task.schedule,
            done: task.done,
          }
        }
      })
      alert('更新しました')
      router.push(`/tasks/${task.id}`)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <input type="text" name="title"  value={task.title!} placeholder={'タイトル'} onChange={handleChange} className={styles.title} />
      </div>
      <div>
        <textarea name="content" value={task.content!} placeholder={'内容'} onChange={handleChange} className={styles.content} />
      </div>
      <div>
        <input type="datetime-local" name="schedule" value={formatDateTime(task.schedule!)} onChange={handleChange}  />
      </div>
      <div className={styles.button}>
        <button onClick={handleSave} >更新</button>
      </div>
    </div>

  )
}

export default EditTask
