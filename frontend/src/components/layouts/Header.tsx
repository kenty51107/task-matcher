import Link from 'next/link'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          <Link href="/" className={styles.logo}>
            TodoMatcher
          </Link>
        </h1>
        <div className={styles.menu}>
          <Link className={styles.createLink} href="/tasks/new">
            タスクを作成する
          </Link>
        </div>
      </div>
    </header>
  )
}
