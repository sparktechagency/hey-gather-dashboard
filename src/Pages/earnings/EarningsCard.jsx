import React from 'react'
import { CiDollar } from 'react-icons/ci'
import earningLogo from '../../assets/earnings.svg'
import { useGetEarningsChartQuery } from '../../redux/earningsApis'

const EarningsCard = () => {
  const { data: earningsData, isLoading } = useGetEarningsChartQuery()
  if (isLoading) {
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow flex justify-center items-center h-64">
        Loading...
      </div>
    )
  }
  return (
    <div className="relative bg-gradient-to-l to-green-[rgba(233,255,233,1)] from-green-100 flex items-center justify-between h-[300px] w-[500px]  p-6 rounded-lg shadow-lg ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${earningLogo})`,
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(20px)',
          backgroundSize: 'cover',
          opacity: '1',
          zIndex: -1,
          marginTop: '100px',
          marginLeft: '130px',
        }}
      ></div>

      <div className="flex items-center space-x-4">
        <div className="bg-white p-3 rounded-full">
          <div className="w-6 h-6 text-blue-500 flex items-center justify-center">
            <CiDollar className="text-5xl" />
          </div>
        </div>
        <div>
          <h3 className="text-blue-800 font-bold text-4xl">Total Earnings</h3>
          <p className="text-4xl  font-bold  ">{earningsData?.total_earning}</p>
        </div>
      </div>
    </div>
  )
}

export default EarningsCard
