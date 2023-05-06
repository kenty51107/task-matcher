import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GetTasksDocument } from '../graphql/generated/graphql'
import { GetTasksQuery } from '../graphql/generated/graphql'

const Home: NextPage = () => {
  const { data } = useQuery<GetTasksQuery>(GetTasksDocument)
  return (
    <>
      <div style={{ margin: '0 auto', width: '80%' }}>
        {data?.getTasks?.map((task) => (
          <div key={task?.id}>
            <h1>ID:{task.id}. {task.title}</h1>
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

export default Home
