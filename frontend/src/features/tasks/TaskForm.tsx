type Props = {
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
  schedule: string
  setSchedule: (schedule: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  buttonText: string
}

const TaskForm = ({ title, setTitle, content, setContent, schedule, setSchedule, handleSubmit, buttonText }: Props) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </form>
    </>
  )
}

export default TaskForm
