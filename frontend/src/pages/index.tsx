import {MainLayout} from '../components/layouts/MainLayout'
import { GetTasks } from '../features/tasks/GetTasks'
import Head from 'next/head'

const Home = () => {
  return (
    <div>
      <Head>task matcher</Head>
      <MainLayout></MainLayout>
      <GetTasks></GetTasks>
    </div>
  )
}

export default Home
