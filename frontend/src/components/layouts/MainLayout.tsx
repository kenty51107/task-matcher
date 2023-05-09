import Head from 'next/head'
import { Header } from './Header'

export const MainLayout = () => {
  return (
    <>
      <Head>
        <title>TodoMatcher</title>
      </Head>
      <Header></Header>
    </>
  )
}
