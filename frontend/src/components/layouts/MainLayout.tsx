import Head from 'next/head'
import { Header } from './Header'

export const MainLayout = () => {
  return (
    <div>
      <Head>
        <title>TodoMatcher</title>
      </Head>
      <Header></Header>
    </div>
  )
}
