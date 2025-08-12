import React from 'react'
import VendorTable from './VendorTable'
import EarningsCard from './EarningsCard'
import EarningsGrowthChart from './EarningsGrowthChart'
import { useNavigate } from 'react-router-dom'

const Earnings = () => {
  const Navigate = useNavigate()
  return (
    <div className="mb-20">
      <h1
        className="text-xl font-semibold cursor-pointer my-5"
        onClick={() => Navigate(-1)}
      >
        ← Earnings
      </h1>
      <section className="flex justify-between gap-5">
        <EarningsCard />
        <EarningsGrowthChart />
      </section>
      <section>
        <VendorTable />
      </section>
    </div>
  )
}

export default Earnings
