import { CreateTaskInput, UpdateTaskInput } from '../../generated/graphql'
import dayjs from 'dayjs'
import styles from './styles/TaskForm.module.css'

type Props = {
  task: CreateTaskInput | UpdateTaskInput
  isError: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSave: () => void
}


export const TaskForm = ({task, isError, handleChange, handleSave}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <input type="text" name="title" value={task.title!} placeholder={'タイトル'} onChange={(e) =>handleChange(e)} className={styles.title} required />
        <p className={styles.counter}>{ task.title!.length } / 100文字</p>
      </div>
      <div className={styles.formWrapper}>
        <textarea name="content" value={task.content!} placeholder={'内容'} onChange={handleChange} className={styles.content} required />
        <p className={styles.counter}>{ task.content!.length } / 225文字</p>
      </div>
      <div>
        <input type="datetime-local" name="schedule" value={dayjs(task.schedule!).format("YYYY-MM-DD HH:mm:ss")} onChange={handleChange} required />
      </div>
      <div className={styles.button}>
        <button onClick={handleSave} disabled={isError}>作成</button>
      </div>
    </div>
  )
}
