import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { useGetEarningsChartQuery } from '../../../../redux/earningsApis'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const ActivityStatistics = () => {
  const { data: overViewData, isLoading, isError } = useGetEarningsChartQuery()

  const usersCount = overViewData?.user || 0
  const vendorsCount = overViewData?.vendor || 0
  const totalUsersAndVendors = usersCount + vendorsCount

  const chartData = {
    labels: ['Total Users', 'Total Vendors'],
    datasets: [
      {
        label: 'Activity Statistics',
        data: [usersCount, vendorsCount],
        backgroundColor: ['#ff4c4c', '#ffbf00'],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw
            return `${context.label}: ${value}`
          },
        },
      },
    },
    cutout: '70%',
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load statistics.</p>
    )
  }

  return (
    <div className="shadow p-2 rounded-md pt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Activity Statistics
      </h2>

      <div className="flex justify-center items-center relative mb-6">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute top-3/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-black">
          {totalUsersAndVendors}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-sm">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          Active Users
          <span className="px-3 py-1 bg-red-200 rounded-md">{usersCount}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
          Active Vendors
          <span className="px-3 py-1 bg-yellow-200 rounded-md">
            {vendorsCount}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ActivityStatistics

// import React, { useEffect } from 'react'
// import { Doughnut } from 'react-chartjs-2'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
// import { useGetEarningsChartQuery } from '../../../../redux/earningsApis'

// ChartJS.register(ArcElement, Tooltip, Legend, Title)

// const ActivityStatistics = () => {
//   const { data: overViewData } = useGetEarningsChartQuery()
//   const allData = {
//     labels: ['Total Users', 'Total Vendors'],
//     datasets: [
//       {
//         label: 'Activity Statistics',
//         data: [120, 120],
//         backgroundColor: ['#ff4c4c', '#ffbf00'],
//         borderWidth: 0,
//       },
//     ],
//   }

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           font: {
//             size: 14,
//           },
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const value = context.raw
//             return `${context.label}: ${value}`
//           },
//         },
//       },
//     },
//     cutout: '70%',
//   }

//   return (
//     <div className="shadow  p-2 rounded-md pt-10">
//       <h2 className="text-2xl font-semibold text-center mb-6">
//         Activity Statistics
//       </h2>

//       <div className="flex justify-center items-center relative mb-6">
//         <Doughnut data={allData} options={options} />
//         <div className="absolute top-3/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-xl font-bold text-black">
//           360
//         </div>
//       </div>

//       <div className="flex flex-col justify-center items-center text-sm">
//         <div className="flex items-center gap-1 ">
//           <span className="w-3 h-3  bg-red-500 rounded-full mr-2"></span>
//           Active users
//           <span className="px-3 py-1 bg-red-200 rounded-md">
//             {allData.datasets[0]?.data[0]}
//           </span>
//         </div>
//         <div className="flex items-center gap-1 mt-1">
//           <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
//           Active Vendors{' '}
//           <span className="px-3 py-1 bg-yellow-200 rounded-md">
//             {allData.datasets[0]?.data[1]}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ActivityStatistics
