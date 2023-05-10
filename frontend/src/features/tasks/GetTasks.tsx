import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GetTasksDocument, GetTasksQuery } from '../../generated/graphql'
import { formatDisplayDateTime } from '../time/FormatDateTime'
import styles from './styles/GetTasks.module.css'
import Link from 'next/link'

type OrderBy = {
  field: string
  orientation: string
  optionValue: string
}

const OrderByOption = [
  { value: 'CREATED_AT DESC', label: '作成日が新しい順' },
  { value: 'CREATED_AT ASC', label: '作成日が古い順' },
  { value: 'SCHEDULE DESC', label: '予定日が近い順' },
  { value: 'SCHEDULE ASC', label: '予定日が遠い順' },
]

export const GetTasks = () => {
  const [orderBy, setOrderBy] = useState<OrderBy>({
    field: 'CREATED_AT',
    orientation: 'DESC',
    optionValue: 'CREATED_AT DESC',
  })
  const { loading, error, data } = useQuery<GetTasksQuery>(GetTasksDocument,
    { variables: { field: orderBy.field, orientation: orderBy.orientation } }
  )
  if(loading) {
    return <p>Loading...</p>
  }
  if(error) {
    return <p>Error: {error.message}</p>
  }

  const changeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const option = OrderByOption.find((option) => option.value === value)
    if(option) {
      const [field, orientation] = option.value.split(' ')
      setOrderBy({ field, orientation, optionValue: value })
    }
  }
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.sort}>
            <select className={styles.selectbox} value={orderBy.optionValue} onChange={changeSortType}>
              {OrderByOption.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.body}>
          {data?.getTasks?.map((task) => (
            <div key={task?.id} className={styles.item}>
              <Link href={`/tasks/${task.id}`}>
                <h2>{task.title}</h2>
              </Link>
              <p>{formatDisplayDateTime(task.schedule!)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
