import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { GetTaskDocument, GetTaskQuery } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { Header } from '../../components/layouts/Header'
import styles from './TaskDetail.module.css'
import Link from 'next/link'

const TaskDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const { loading, error, data } = useQuery<GetTaskQuery>(GetTaskDocument, {
    variables: { id: id }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <Head>
        <title>{data?.getTask?.title}</title>
      </Head>
      <Header></Header>
      <div className={styles.itemContainer}>
        <h3 className={styles.header}>
          {data?.getTask?.title}
          <Link href={`/tasks/${data?.getTask?.id}/editTask`}>
            編集
          </Link>
          <Link href={`/tasks/${data?.getTask?.id}/edit`}>
            edit
          </Link>
        </h3>
        <div className={styles.body}>
          <ul>
            <li>内容: {data?.getTask?.content}</li>
            <li>スケジュール: {data?.getTask?.schedule}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default TaskDetail
