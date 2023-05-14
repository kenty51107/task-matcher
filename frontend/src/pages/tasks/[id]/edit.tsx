import { useRouter } from 'next/router'
import Link from 'next/link'
import EditTask from '../../../features/tasks/EditTask'
import styles from '../styles/edit.module.css'
import { Header } from '../../../components/layouts/Header'

const EditTaskPage = () => {
  const router = useRouter()
  const id = String(router.query.id)
  return (
    <div>
      <Header />
      <div className={styles.form}>
        <EditTask id={id} />
      </div>
      <hr />
      <Link href={`/tasks/${id}`} className={styles.cancel}>
        キャンセル
      </Link>
    </div>
  )
}

export default EditTaskPage
