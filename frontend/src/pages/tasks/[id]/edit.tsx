import { useRouter } from 'next/router'
import Link from 'next/link'
import EditTask from '../../../features/tasks/EditTask'

const EditTaskPage = () => {
  const router = useRouter()
  const id = String(router.query.id)
  return (
    <div>
      <EditTask id={id} />
      <hr />
      <Link href={`/tasks/${id}`}>
        もどる
      </Link>
    </div>
  )
}

export default EditTaskPage
