import Link from 'next/link'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <>
      <header>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <Link href="/" className={styles.logo}>
              TodoMatcher
            </Link>
          </div>
          <div className={styles.menu}>
            <Link href="/tasks/createTask">
              タスクを作成する
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
