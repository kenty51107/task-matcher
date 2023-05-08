import { useQuery } from '@apollo/client'
import { GetTasksDocument } from '../../generated/graphql'
import { GetTasksQuery } from '../../generated/graphql'
import styles from './styles/GetTasks.module.css'
import Link from 'next/link'

export const GetTasks = () => {
  const { data } = useQuery<GetTasksQuery>(GetTasksDocument)
  return (
    <>
      <div style={{ margin: '0 auto', width: '80%' }}>
        {data?.getTasks?.map((task) => (
          <div key={task?.id} className={styles.item}>
            <Link href={`/tasks/${task.id}`}>
              <h2>ID:{task.id}. {task.title}</h2>
            </Link>
            <p>content: {task.content}</p>
            <p>schedule: {task.schedule}</p>
            <p>created_at: {task.created_at}</p>
            <p>updated_at: {task.updated_at}</p>
          </div>
        ))}
      </div>
    </>
  )
}
