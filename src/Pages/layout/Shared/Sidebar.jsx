import { FaHome, FaShieldAlt } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaUserGroup } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'
import { CiLogout } from 'react-icons/ci'
import { SiFuturelearn } from 'react-icons/si'
import hye_logo from '../../../assets/hye_logo.svg'
import { PiNotebookFill } from 'react-icons/pi'
import { BiSolidOffer } from 'react-icons/bi'
import { GrServices } from 'react-icons/gr'
import { PiUsersFourFill } from 'react-icons/pi'
import { MdPaid } from 'react-icons/md'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', link: '/', icon: <FaHome /> },
    {
      name: 'Users',
      link: '/users',
      icon: <PiUsersFourFill />,
    },
    { name: 'Vendors', link: '/vendors', icon: <FaUserGroup /> },
    { name: 'Bookings', link: '/bookings', icon: <PiNotebookFill /> },
    { name: 'Subscription', link: '/subscription', icon: <MdPaid /> },
    {
      name: 'Earnings',
      link: '/earnings',
      icon: <SiFuturelearn />,
    },
    {
      name: 'Service Category',
      link: '/service-category',
      icon: <GrServices />,
    },
    {
      name: 'Promo Codes',
      link: '/promo-codes',
      icon: <BiSolidOffer />,
    },
    {
      name: 'FAQ',
      link: '/frequent-asked-question',
      icon: <BiSolidOffer />,
    },
    {
      name: 'Profile Settings',
      link: '/profile',
      icon: <CgProfile />,
    },
    { name: 'Privacy Policy', link: '/privacy-policy', icon: <FaShieldAlt /> },
    {
      name: 'Terms & condition',
      link: '/terms-and-condition',
      icon: <FaShieldAlt />,
    },
  ]
  const Navigate = useNavigate()
  return (
    <div className=" w-[250px] h-[96vh] overflow-y-scroll px-3 bg-white  ">
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => Navigate('/')}
      >
        <img src={hye_logo} alt="logo" className="mt-5 " />
        <h2 className="app-default-color font-bold text-center mb-5 text-3xl ">
          HYE GATHER
        </h2>
      </div>

      <div className="flex flex-col justify-between h-[80vh]">
        <div>
          {menuItems.map((item, index) => (
            <NavLink
              to={item?.link}
              key={index}
              className={({ isActive }) =>
                `flex items-center  py-3 rounded-3xl my-1 pl-6 hover:bg-[#0033A0] cursor-pointer hover:text-white ${
                  isActive ? 'bg-[#0033A0] text-white' : ''
                }`
              }
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
        <Link
          to={'/login'}
          onClick={() => localStorage.clear()}
          className={`flex items-center text-red-500 font-bold py-3 rounded-3xl my-1 pl-6 hover:bg-red-200 cursor-pointer `}
        >
          <span>
            <CiLogout className="mr-4 text-2xl" />
          </span>
          <span>
            <div>Log out</div>
          </span>
        </Link>
      </div>
      {/* <ul>
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={index}
            className={({ isActive }) =>
              `flex items-center  py-3 rounded-3xl my-1 pl-6 hover:bg-[#0033A0] cursor-pointer hover:text-white ${
                isActive ? 'bg-[#0033A0] text-white' : ''
              }`
            }
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </ul> */}
    </div>
  )
}

export default Sidebar
