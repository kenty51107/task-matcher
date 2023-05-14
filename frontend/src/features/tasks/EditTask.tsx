import { NextPage } from 'next'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetTaskDocument, GetTaskQuery } from '../../generated/graphql'
import { UpdateTaskInput, UpdateTaskDocument, UpdateTaskMutation,  } from '../../generated/graphql'
import { TaskForm } from './TaskForm'
import dayjs from 'dayjs'

type Props = {
  id: string
}

const EditTask: NextPage<Props> = ({ id }) => {
  const [task, setTask] = useState<UpdateTaskInput>({
    id: '',
    title: '',
    content: '',
    schedule: '',
    done: false,
  })
  const { loading, data } = useQuery<GetTaskQuery>(GetTaskDocument, {
    variables: { id },
    skip: !id,
  })
  const [isError, setIsError] = useState<boolean>(true)
  const [updateTask] = useMutation<UpdateTaskMutation>(UpdateTaskDocument)
  const router = useRouter()

  const inputLengthZero = (): boolean => {
    if (task.title!.length === 0 || task.content!.length === 0 || task.schedule === '') {
      return true
    } else {

    return false
    }
  }

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

  useEffect(() => {
    console.log(task)
    setIsError(inputLengthZero())
  }, [task])

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
            schedule: dayjs(task.schedule).format(),
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
    <TaskForm
      task={task}
      isError={isError}
      handleChange={(e) => handleChange(e)}
      handleSave={() => handleSave()}
    />
  )
}

export default EditTask
