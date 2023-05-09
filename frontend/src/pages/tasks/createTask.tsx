import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CreateTaskDocument, CreateTaskMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import { CreateTaskMutation } from '../../generated/graphql'

const CreateTask = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [schedule, setSchedule] = useState('')
  const [createTask] = useMutation<(CreateTaskMutation)>(CreateTaskDocument)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title, content, schedule)
    try {
      await createTask({
        variables: {
          title,
          content,
          schedule,
        }
      })
      alert('作成しました')
      router.push('/')
    } catch (error) {
      console.error('Error creating task', error)
    }
  }

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

  const getNow = () => {
    const now = new Date()
    const year = now.getFullYear().toString().padStart(4, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    const hour = now.getHours().toString().padStart(2, '0')
    const minute = now.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day}T${hour}:${minute}`
  }

  useEffect(() => {
    setSchedule(getNow())
  }, [])

  return (
    <>
      <h1>新規作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="schedule">予定日</label>
          <input type="datetime-local" id="schedule" value={formatDateTime(schedule)} onChange={(e) => setSchedule(addTimeZone(e.target.value))} required />
        </div>
        <div>
          <label htmlFor="content">内容</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">作成</button>
      </form>
    </>
  )
}

export default CreateTask
// type CreateTaskFormProps = {
//   onSuccess: () => void
//   onError: (error: Error) => void
// }

// const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSuccess, onError }) => {
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [schedule, setSchedule] = useState('')
//   const [createTask, { loading }] = useMutation<CreateTaskMutation>(CreateTaskDocument, {
//     onError: (error) => {
//       console.log(error)
//     },
//   })
//   // const [createTask, { loading, error }] = useMutation(CreateTaskMutation)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     try {
//       await createTask({
//         variables: { input: { title, content, schedule } },
//       })
//       setTitle('')
//       setContent('')
//       setSchedule('')
//       onSuccess()
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">タイトル</label>
//           <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="content">内容</label>
//           <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Loading..." : "作成"}
//         </button>
//       </form>
//     </>
//   )
// }

// export default CreateTaskForm
