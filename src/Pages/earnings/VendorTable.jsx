import React, { useState } from 'react'
import { Table, Button, Modal } from 'antd'
import { FaStar, FaUserCircle } from 'react-icons/fa'
import { MdBlock } from 'react-icons/md'
import { IoIosWarning } from 'react-icons/io'
import { useGetEarningsQuery } from '../../redux/earningsApis'
import { url } from '../../redux/main/server'
import { useUpdateVendorBlockTypeMutation } from '../../redux/vendorApis'
import Loader from '../loading/ReactLoader'

const VendorTable = () => {
  const {
    data: earningsData,
    isLoading,
    refetch,
    error,
  } = useGetEarningsQuery()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [updateVendorBlock] = useUpdateVendorBlockTypeMutation()

  const getTransformedData = () => {
    if (!earningsData || !earningsData.data) return []

    return earningsData.data.map((item) => ({
      key: item._id,
      userId: item.user._id,
      image: item.user.img
        ? `${url}/${item.user.img}`
        : 'https://placehold.co/400x400',
      name: item.user.name,
      email: item.user.email,
      type: item.purpose === 'BASIC' ? 'Subscription Purchase' : 'Other',
      date: new Date(item.createdAt).toLocaleDateString(),
      plan: item.subscription_type === 'YEARLY' ? 'Yearly' : 'Monthly',
      amount: `$${item.amount}`,
      subscription: item.status ? 'Active' : 'Blocked',
      reviews: 4.5,
      reviewsNumber: 50,
      contactNumber: '388-790-9022',
      paymentMethod: item.pay_by,
    }))
  }

  const tableData = getTransformedData()

  const columns = [
    {
      title: 'Vendor Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img src={record.image} alt="" className="w-12 h-12 rounded-full" />
          <span className="text-gray-900 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    // {
    //   title: 'Subscription',
    //   dataIndex: 'subscription',
    //   key: 'subscription',
    //   render: (text) => (
    //     <div
    //       className={`badge ${
    //         text === 'Active' ? 'bg-green-500' : 'bg-red-500'
    //       } text-white py-1 px-3 rounded w-[100px] flex items-center justify-center`}
    //     >
    //       {text}
    //     </div>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<FaUserCircle />}
            className="bg-blue-800 text-white"
            onClick={() => handleViewProfile(record)}
          />
          {/* <Button
            type="primary"
            icon={<MdBlock />}
            className={
              selectedUser?.key === record.key
                ? 'bg-blue-500 text-white'
                : 'bg-red-500 text-white'
            }
            onClick={() => confirmDeleteUser(record)}
          /> */}
        </div>
      ),
    },
  ]

  const handleViewProfile = (user) => {
    setSelectedUser(user)
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setSelectedUser(null)
  }

  // const confirmDeleteUser = (user) => {
  //   setSelectedUser(user)
  //   setIsDeleteModalVisible(true)
  // }

  const handleDeleteUser = async () => {
    try {
      await updateVendorBlock({ id: selectedUser.userId }).unwrap()
      refetch()
      setIsDeleteModalVisible(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error updating vendor block status:', error)
    }
  }

  // const handleDeleteUser = () => {
  //   setIsDeleteModalVisible(false)
  //   setSelectedUser(null)
  // }

  if (isLoading) return <Loader />
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading data: {error.message}
      </div>
    )

  return (
    <div className="mt-5">
      <h1 className="text-xl font-semibold py-5 bg-white mb-2 px-2">
        Earnings History
      </h1>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ position: ['bottomCenter'] }}
        loading={isLoading}
      />

      {selectedUser && (
        <Modal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          className="modal-profile px-2 py-2"
          centered
          width={450}
        >
          <div className="flex flex-col items-center text-center">
            <img
              src={selectedUser.image || '/path/to/placeholder-image.jpg'}
              alt={selectedUser.name || 'User'}
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">
              {selectedUser.name || 'N/A'}
            </h2>
            {/* <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-xl mr-1 ${
                    star <= Math.round(selectedUser.reviews)
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <p className="text-gray-600 ml-2">
                {selectedUser.reviews} Rating ({selectedUser.reviewsNumber}{' '}
                reviews)
              </p>
            </div> */}
            <p className="text-gray-600">
              {selectedUser.contactNumber || 'N/A'}
            </p>
            <p className="text-gray-600">{selectedUser.email}</p>

            <div className="bg-gray-100 p-3 rounded-lg w-full mt-4">
              <p className="font-medium">Payment Method</p>
              <p>{selectedUser.paymentMethod || 'CARD'}</p>
            </div>

            {/* <div className="grid grid-cols-2 border-black mt-4 w-full">
              <div className="text-center border-r border-t p-5">
                <span className="text-xl font-bold">
                  {selectedUser.totalBook || 0}
                </span>
                <p>Total Bookings</p>
              </div>
              <div className="text-center border-t p-5">
                <span className="text-xl font-bold">{3}</span>
                <p>Complete Bookings</p>
              </div>
              <div className="text-center border-r border-t p-5">
                <span className="text-xl font-bold">{1}</span>
                <p>Cancel Bookings</p>
              </div>
              <div className="text-center border-t p-5">
                <span className="text-xl font-bold">
                  {selectedUser.reviewsNumber || 0}
                </span>
                <p>Total Reviews</p>
              </div>
            </div> */}
          </div>
        </Modal>
      )}

      <Modal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDeleteUser}
        okText={
          selectedUser?.subscription === 'Active'
            ? 'Yes, block'
            : 'Yes, unblock'
        }
        cancelText="Cancel"
        centered
        okButtonProps={{
          style: { backgroundColor: 'red', borderColor: 'red' },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: 'blue',
            borderColor: 'blue',
            color: 'white',
          },
        }}
      >
        <div className="text-lg h-[200px] flex flex-col items-center justify-center">
          <div className="flex justify-center">
            <IoIosWarning className="text-7xl text-yellow-400" />
          </div>
          <div className="font-bold text-4xl text-center mt-2">Warning</div>
          <div className="p-3 text-center text-red-700">
            Are you sure you want to{' '}
            {selectedUser?.subscription === 'Active' ? 'block' : 'unblock'} this
            user?
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default VendorTable
