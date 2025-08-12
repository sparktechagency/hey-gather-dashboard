import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import manLogo from '../../../assets/man.svg'
import LineChartGreen from '../../../assets/Line Chart.svg'
import LineChartRed from '../../../assets/Line Chart red.svg'
import hyeLogo from '../../../assets/hye_logo.svg'

const UserCardCarousel = ({ data }) => {
  return (
    <div className="flex justify-between gap-5 mt-5">
      <section className="relative bg-white shadow-lg w-[300px] rounded-lg p-6  ">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hyeLogo})`,
            backgroundRepeat: 'no-repeat',
            backdropFilter: 'blur(20px)',
            backgroundSize: 'contain',
            opacity: '0.1',
            zIndex: 1,
          }}
        ></div>
        <div>
          <img src={manLogo} alt="logo" />
        </div>
        <div className="font-bold text-3xl ">Total Users</div>
        <div className="text-blue-800 font-bold text-5xl">{data?.user}</div>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-6 max-w-[600px] w-full bg-gradient-to-l to-green-[rgba(233,255,233,1)] from-green-100 ">
        <div className="flex justify-between">
          <div>
            <p>Weekly User Statistics</p>
            <p className="text-2xl font-bold">Joined This Month</p>
          </div>
          <div>
            <img src={manLogo} alt="logo" />
          </div>
        </div>
        <div className="flex justify-between mt-10 items-center">
          <div className="flex items-center gap-2">
            <FaArrowUp className="bg-green-100 p-5 text-7xl rounded-lg" />

            <div>
              <div className="text-3xl font-bold">120</div>
              <div className="text-green-500 text-xl ">+16,24 %</div>
            </div>
          </div>
          <div>
            <img src={LineChartGreen} alt="green-chart" />
          </div>
        </div>
      </section>
      <section className="bg-white shadow-lg rounded-lg p-6 max-w-[600px] w-full  bg-gradient-to-l to-red-[rgba(233,255,233,1)] from-red-100 ">
        <div className="flex justify-between">
          <div>
            <p>Weekly User Statistics</p>
            <p className="text-2xl font-bold">Joined This Week</p>
          </div>
          <div>
            <img src={manLogo} alt="logo" />
          </div>
        </div>
        <div className="flex justify-between mt-10 items-center">
          <div className="flex items-center gap-2">
            <FaArrowDown className="bg-green-100 p-5 text-7xl text-red-500 rounded-lg" />

            <div>
              <div className="text-3xl font-bold">120</div>
              <div className="text-red-500 text-xl ">-16,24 %</div>
            </div>
          </div>
          <div>
            <img src={LineChartRed} alt="red-chart" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserCardCarousel
