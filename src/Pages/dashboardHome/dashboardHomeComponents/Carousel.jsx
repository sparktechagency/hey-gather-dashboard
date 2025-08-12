import React from 'react'
import UserCardCarousel from './UserCardCarousel'
import VendorCardCarousel from './VendorCardCarousel'
import { useGetEarningsChartQuery } from '../../../redux/earningsApis'

const Carousel = () => {
  const { data } = useGetEarningsChartQuery()

  return (
    <div>
      <UserCardCarousel data={data} />
      <VendorCardCarousel data={data} />
    </div>
  )
}

export default Carousel
