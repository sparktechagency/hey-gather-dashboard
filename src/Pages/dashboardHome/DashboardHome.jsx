import Carousel from './dashboardHomeComponents/Carousel'
import DashboardCharts from './dashboardHomeComponents/dashboardChart/DashboardCharts'
import Users from '../users/Users'
import { useNavigate } from 'react-router-dom'

const DashboardHome = () => {
  const Navigate = useNavigate()
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => Navigate(-1)}
        >
          ← Dashboard
        </h1>
      </div>
      <Carousel />
      <div className="mt-10 bg-white  rounded-lg card-shadow">
        <DashboardCharts />
      </div>
      <Users dashboardHome={true} />
    </div>
  )
}

export default DashboardHome
