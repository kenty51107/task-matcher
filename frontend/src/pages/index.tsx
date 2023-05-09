import {MainLayout} from '../components/layouts/MainLayout'
import { GetTasks } from '../features/tasks/GetTasks'

const Home = () => {
  return (
    <>
      <MainLayout></MainLayout>
      <GetTasks></GetTasks>
    </>
  )
}

export default Home
