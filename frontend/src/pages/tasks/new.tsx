import Link from 'next/link'
import CreateTask from '../../features/tasks/CreateTask'
import styles from './styles/new.module.css'
import { Header } from '@/src/components/layouts/Header'

const CreateTaskPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.form}>
        <CreateTask />
      </div>
      <hr />
      <Link href={`/`} className={styles.cancel}>
        キャンセル
      </Link>
    </div>
  )
}

export default CreateTaskPage
