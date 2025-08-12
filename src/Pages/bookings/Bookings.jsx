// import { useState } from 'react'
// import { Button, Modal, Table, Tag } from 'antd'
// import { useNavigate } from 'react-router-dom'
// import Loader from '../loading/ReactLoader'
// import { useGetAllBookingsQuery } from '../../redux/bookingsApis'
// import { url } from '../../redux/main/server'
// import { usePostTransferBalanceMutation } from '../../redux/transferBalanceApis'

// const Bookings = () => {
//   const Navigate = useNavigate()
//   const { data: bookingsData, isLoading, isError } = useGetAllBookingsQuery()
//   // const [transferBalance] = usePostTransferBalanceMutation()

//   const [isModalOpen, setIsModalOpen] = useState(false)

//   if (isError) {
//     return (
//       <div className="h-screen flex items-center justify-center w-[500px] mx-auto">
//         <div className="shadow bg-white flex flex-col justify-center items-center w-full p-12 rounded-md">
//           <h1 className="text-4xl font-bold m-2 viga-text app-default-color">
//             Something went wrong
//           </h1>
//         </div>
//       </div>
//     )
//   }

//   if (isLoading) {
//     return <Loader />
//   }

//   const transformedData =
//     bookingsData?.data?.map((booking) => {
//       const serviceNames = booking.services.map((service) => service.name)

//       const user = booking.user[0]
//       const category = booking.category[0]
//       const vendor = booking.vendor?.[0]

//       console.log(vendor)

//       const formatDate = (dateString) => {
//         const date = new Date(dateString)
//         return date.toISOString().split('T')[0]
//       }

//       const getStatusColor = (status) => {
//         switch (status) {
//           case 'accepted':
//             return 'green'
//           case 'pending':
//             return 'blue'
//           case 'canceled':
//             return 'red'
//           default:
//             return 'blue'
//         }
//       }

//       const formatPrice = (price) => {
//         return `$${price.toFixed(2)}`
//       }

//       return {
//         key: booking._id,
//         userName: user.name,
//         userImage: user.img
//           ? `${url}/${user.img}`
//           : 'https://placehold.co/400x400',
//         vendorName: category.name,
//         vendorImage: category.img
//           ? `${url}/${category.img}`
//           : 'https://placehold.co/400x400',
//         vendor_name: vendor?.name,
//         vendor_email: vendor?.email,
//         vendor_phone: vendor?.phone,
//         vendor_image: vendor?.img
//           ? `${url}/${vendor?.img}`
//           : 'https://placehold.co/400x400',
//         vendor_id: vendor?._id,
//         bookingDate: formatDate(booking.date),
//         service: serviceNames,
//         location: 'N/A',
//         eventDate: formatDate(booking.date),
//         time: new Date(booking.time).toLocaleTimeString(),
//         amount: formatPrice(booking.price),
//         status: booking.status,
//         statusColor: getStatusColor(booking.status),
//         isPaid: booking.is_paid,
//         paidToVendor: booking.paid_to_vendor,
//         guests: booking.number_of_guests,
//         duration: booking.duration,
//         additionalServices: booking.additional_services,
//       }
//     }) || []

//   const showModal = () => {
//     setIsModalOpen(true)
//   }
//   const handleOk = () => {
//     setIsModalOpen(false)
//   }
//   const handleCancel = () => {
//     setIsModalOpen(false)
//   }

//   const columns = [
//     {
//       title: 'User Name',
//       dataIndex: 'userName',
//       key: 'userName',
//       render: (text, record) => (
//         <div className="flex items-center space-x-3">
//           <img
//             src={record.userImage}
//             alt=""
//             className="w-12 h-12 rounded-full"
//           />
//           <span className="text-gray-900 font-medium">{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: 'Vendor Name',
//       dataIndex: 'vendor_name',
//       key: 'vendor_name',
//       render: (text, record) => (
//         <div>
//           {text ? (
//             <div className="flex items-center space-x-3">
//               <img
//                 src={record.vendor_image}
//                 alt=""
//                 className="w-12 h-12 object-cover object-center rounded-full"
//               />
//               <span className="text-gray-900 font-medium">{text}</span>
//             </div>
//           ) : (
//             <div>No Vendor</div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Category Name',
//       dataIndex: 'vendorName',
//       key: 'vendorName',
//       render: (text, record) => (
//         <div className="flex items-center space-x-3">
//           <img
//             src={record.vendorImage}
//             alt=""
//             className="w-12 h-12 rounded-full"
//           />
//           <span className="text-gray-900 font-medium">{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: 'Booking Date',
//       dataIndex: 'bookingDate',
//       key: 'bookingDate',
//     },
//     {
//       title: 'Service',
//       dataIndex: 'service',
//       key: 'service',
//       render: (service) => (
//         <div className="flex flex-wrap gap-2 w-[300px]">
//           {service.slice(0, 2).map((category, index) => (
//             <span
//               key={index}
//               className="px-4 py-2 bg-green-100 rounded-md text-green-800"
//             >
//               {category}
//             </span>
//           ))}
//           {service.length > 2 && (
//             <span className="px-2 py-2 flex items-center justify-center bg-green-100 rounded-md text-green-800">
//               +{service.length - 2}
//             </span>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Time',
//       dataIndex: 'time',
//       key: 'time',
//     },
//     {
//       title: 'Event Date',
//       dataIndex: 'eventDate',
//       key: 'eventDate',
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => {
//         const displayStatus = status.charAt(0).toUpperCase() + status.slice(1)

//         return (
//           <Tag
//             color={record.statusColor}
//             className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center"
//           >
//             {displayStatus}
//           </Tag>
//         )
//       },
//     },
//     {
//       title: 'Payment',
//       dataIndex: 'isPaid',
//       key: 'isPaid',
//       render: (isPaid) => {
//         const status = isPaid ? 'Paid' : 'Unpaid'
//         const color = isPaid ? 'green' : 'red'

//         return (
//           <Tag
//             color={color}
//             className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center"
//           >
//             {status}
//           </Tag>
//         )
//       },
//     },
//     {
//       title: 'Pay Vendor',
//       dataIndex: 'payVendor',
//       key: 'payVendor',
//       render: (payVendor) => {
//         return (
//           <Tag
//             onClick={showModal}
//             className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center cursor-pointer hover:bg-blue-100"
//           >
//             Pay
//           </Tag>
//         )
//       },
//     },
//   ]

//   return (
//     <>
//       <h1
//         className="text-xl font-semibold cursor-pointer mt-5 mb-5"
//         onClick={() => Navigate(-1)}
//       >
//         ← Booking
//       </h1>

//       <Table
//         className="mb-20"
//         dataSource={transformedData}
//         columns={columns}
//         loading={isLoading}
//         pagination={{ position: ['bottomCenter'], pageSize: 10 }}
//       />

//       <Modal
//         title="Basic Modal"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         centered
//         className="w-[400px]"
//       >
//         <div className="px-5">
//           <input
//             type="text"
//             disabled
//             className="w-full h-[40px]"
//             value={'ahsan'}
//           />
//           <input
//             type="text"
//             disabled
//             className="w-full h-[40px]"
//             value={'USD'}
//           />
//           <input
//             type="text"
//             disabled
//             className="w-full h-[40px]"
//             value={transformedData[0].amount}
//           />
//           <input
//             type="text"
//             disabled
//             className="w-full h-[40px]"
//             value={'ahsan'}
//           />
//           <input
//             type="text"
//             disabled
//             className="w-full h-[40px]"
//             value={'ahsan'}
//           />
//         </div>
//       </Modal>
//     </>
//   )
// }

// export default Bookings

import { useState } from 'react'
import { Button, Image, Input, Modal, Table, Tag, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Loader from '../loading/ReactLoader'
import { useGetAllBookingsQuery } from '../../redux/bookingsApis'
import { url } from '../../redux/main/server'
import { usePostTransferBalanceMutation } from '../../redux/transferBalanceApis'

const Bookings = () => {
  const Navigate = useNavigate()
  const { data: bookingsData, isLoading, isError } = useGetAllBookingsQuery()
  const [postTransferBalance, { isLoading: isTransferring }] =
    usePostTransferBalanceMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center w-[500px] mx-auto">
        <div className="shadow bg-white flex flex-col justify-center items-center w-full p-12 rounded-md">
          <h1 className="text-4xl font-bold m-2 text-red-500">
            Something went wrong
          </h1>
        </div>
      </div>
    )
  }

  if (isLoading) return <Loader />

  const transformedData =
    bookingsData?.data
      ?.map((booking) => {
        const user = booking.user[0]
        const category = booking.category[0]
        const vendor = booking.vendor?.[0]

        return {
          key: booking._id,
          userName: user.name,
          userImage: user.img
            ? `${url}/${user.img}`
            : 'https://placehold.co/400x400',
          vendorName: category.name,
          vendorImage: category.img
            ? `${url}/${category.img}`
            : 'https://placehold.co/400x400',
          vendor_name: vendor?.name,
          vendor_email: vendor?.email,
          vendor_phone: vendor?.phone,
          vendor_image: vendor?.img
            ? `${url}/${vendor?.img}`
            : 'https://placehold.co/400x400',
          vendor_id: vendor?._id,
          currency: 'USD',
          amount: booking.price,
          bookingId: booking._id,
          status: booking.status,
          isPaid: booking.is_paid,
          statusColor:
            booking.status === 'accepted'
              ? 'purple'
              : booking.status === 'pending'
              ? 'blue'
              : booking.status === 'canceled'
              ? 'red'
              : 'green',
        }
      })
      .reverse() || []

  const handlePayClick = (record) => {
    setSelectedBooking(record)
    setIsModalOpen(true)
  }

  const handleModalSubmit = async () => {
    if (!adminPassword) return message.error('Please enter admin password.')

    try {
      await postTransferBalance({
        amount: selectedBooking.amount,
        currency: selectedBooking.currency,
        id: selectedBooking.vendor_id,
        password: adminPassword,
        booking: selectedBooking.bookingId,
      }).unwrap()

      message.success('Payment transferred successfully!')
      setIsModalOpen(false)
      setAdminPassword('')
    } catch (err) {
      console.error(err)
      message.error(err?.data?.message || 'Transfer failed')
    }
  }

  const columns = [
    {
      title: 'User',
      dataIndex: 'userName',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.userImage}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <Image
            src={record.vendor_image}
            alt=""
            className="w-[40px] h-[40px] rounded-full object-cover object-center"
            width={40}
            height={40}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'vendorName',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.vendorImage}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (val) => `$${val.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <Tag
          className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center"
          color={record.statusColor}
        >
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'isPaid',
      render: (paid) => (
        <Tag
          className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center"
          color={paid ? 'green' : 'red'}
        >
          {paid ? 'Paid' : 'Unpaid'}
        </Tag>
      ),
    },
    {
      title: 'Pay Vendor',
      key: 'payVendor',
      render: (_, record) => (
        <Tag
          className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center cursor-pointer hover:bg-blue-100"
          onClick={() => handlePayClick(record)}
        >
          Pay
        </Tag>
      ),
    },
  ]

  return (
    <>
      <h1
        className="text-xl font-semibold cursor-pointer mt-5 mb-5"
        onClick={() => Navigate(-1)}
      >
        ← Booking
      </h1>

      <Table
        dataSource={transformedData}
        columns={columns}
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        rowKey="key"
        className="mb-20"
      />

      <Modal
        title={
          <div className="!flex flex-col !items-center justify-center !space-x-3 !mx-auto ">
            <Image
              src={selectedBooking?.vendor_image}
              alt="images"
              className="w-[200px] object-cover object-center h-[200px] rounded-full"
              width={200}
              height={200}
            />
            <span>{selectedBooking?.vendor_name}</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalSubmit}
        okText={isTransferring ? 'Processing...' : 'Submit'}
        confirmLoading={isTransferring}
        centered
      >
        {selectedBooking && (
          <div className="flex flex-col gap-3 p-5">
            <input
              type="text"
              disabled
              value={`Amount: $${selectedBooking.amount}`}
              className="p-2 border rounded"
            />
            <input
              type="text"
              disabled
              value={`Currency: ${selectedBooking.currency}`}
              className="p-2 border rounded"
            />
            <input
              type="text"
              disabled
              readOnly
              value={`Booking ID: ${selectedBooking.bookingId}`}
              className="p-2 border rounded"
            />
            <Input.Password
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter your  password"
              className="p-2 border rounded ring-4 outline-none"
            />
          </div>
        )}
      </Modal>
    </>
  )
}

export default Bookings
