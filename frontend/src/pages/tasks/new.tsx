import Link from 'next/link'
import CreateTask from '../../features/tasks/CreateTask'

const CreateTaskPage = () => {
  return (
    <div>
      <CreateTask />
      <hr />
      <Link href={`/`}>
        もどる
      </Link>
    </div>
  )
}

export default CreateTaskPage
