import ActivityStatistics from './ActivityStatistics'
import BookingGrowth from './BookingGrowth'

const DashboardCharts = () => {
  return (
    <div className="flex gap-4 p-4">
      <BookingGrowth />
      <ActivityStatistics />
    </div>
  )
}

export default DashboardCharts
