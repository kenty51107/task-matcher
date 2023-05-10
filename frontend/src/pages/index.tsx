import {MainLayout} from '../components/layouts/MainLayout'
import { GetTasks } from '../features/tasks/GetTasks'

const Home = () => {
  return (
    <div>
      <MainLayout></MainLayout>
      <GetTasks></GetTasks>
    </div>
  )
}

export default Home
