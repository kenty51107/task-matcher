import { useMutation, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { GetTaskDocument, GetTaskQuery, UpdateTaskDocument, UpdateTaskMutation } from "../../../generated/graphql"

const EditTask = () => {
  const router = useRouter()
  const { id } = router.query
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [schedule, setSchedule] = useState('')

  const { data } = useQuery<GetTaskQuery>(GetTaskDocument, {
    variables: { id },
    skip: !id,
  })

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

  const [updateTask] = useMutation<UpdateTaskMutation>(UpdateTaskDocument)

  useEffect(() => {
    if(data?.getTask) {
      setTitle(data.getTask.title!)
      setContent(data.getTask.content!)
      setSchedule(data.getTask.schedule!)
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(id, title, content, schedule)
    try {
      await updateTask({
        variables: {
          // id,
          // title,
          // content,
          // schedule,
          // done: false,
          id: id,
          title: title,
          content: content,
          schedule: schedule,
          done: false,
        }
      })
      alert('更新しました')
      router.push('/')
    } catch (error) {
      console.error('Error updating task', error)
    }
  }
  return (
    <>
      <h1>編集</h1>
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
        <button type="submit">更新</button>
      </form>
    </>
  )
}

export default EditTask
