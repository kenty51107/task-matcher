import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/client'
import { GetTaskDocument, GetTaskQuery, DeleteTaskDocument, DeleteTaskMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { Header } from '../../components/layouts/Header'
import dayjs from 'dayjs'
import styles from './styles/GetTask.module.css'
import Link from 'next/link'

const GetTask = () => {
  const router = useRouter()
  const { id } = router.query
  const { loading, error, data } = useQuery<GetTaskQuery>(GetTaskDocument, {
    variables: { id: id }
  })
  const [deleteTask] = useMutation<DeleteTaskMutation>(DeleteTaskDocument)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleDelete = async () => {
    try {
      await deleteTask({
        variables: {
          input: {
            id: id,
          }
        }
      })
      alert('削除しました')
      router.push('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <Head>
        <title>{data?.getTask?.title}</title>
      </Head>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{data?.getTask?.title}</h2>
            <Link href={`/tasks/${data?.getTask?.id}/edit`} className={styles.editLink}>
              edit
            </Link>
            <a onClick={handleDelete} className={styles.deleteLink}>delete</a>
          </div>
        <div className={styles.body}>
          <ul className={styles.list}>
            <li><span className={styles.label}>詳細</span> {data?.getTask?.content}</li>
              <li><span className={styles.label}>時間</span> {dayjs(data?.getTask?.schedule!).format("YYYY-MM-DD HH:mm")}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GetTask
