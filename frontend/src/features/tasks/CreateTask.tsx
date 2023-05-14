import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { CreateTaskInput, CreateTaskDocument, CreateTaskMutation } from '../../generated/graphql'
import { TaskForm } from './TaskForm'
import dayjs from 'dayjs'

const CreateTask = () => {
  const [task, setTask] = useState<CreateTaskInput>({
    title: '',
    content: '',
    schedule: '',
  })
  const [isError, setIsError] = useState<boolean>(true)
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument)
  const router = useRouter()

  const inputLengthZero = (): boolean => {
    if (task.title!.length === 0 || task.content!.length === 0 || task.schedule === '') {
      return true
    } else {

    return false
    }
  }

  useEffect(() => {
    console.log(task)
    setIsError(inputLengthZero())
  }, [task])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'title':
        if (value.length > 10) return
      case 'content':
        if (value.length >= 10) return
      default:
        setTask(prevState => ({
          ...prevState,
          [name]: value,
        }))
    }
  }

  const handleSave = async () => {
    try {
      await createTask({
        variables: {
          input: {
            title: task.title,
            content: task.content,
            schedule: dayjs(task.schedule).format()
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
    <TaskForm
      task={task}
      isError={isError}
      handleChange={(e) => handleChange(e)}
      handleSave={() => handleSave()}
    />
  )
}

export default CreateTask
