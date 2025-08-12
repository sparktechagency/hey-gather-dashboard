import React, { useState } from 'react'
import { Table, Button, Modal, Image } from 'antd'
import 'tailwindcss/tailwind.css'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaUserCircle } from 'react-icons/fa'
import deleteUser from '../../assets/delete-user.png'
import { IoIosWarning } from 'react-icons/io'
import { MdBlock } from 'react-icons/md'

import { url } from '../../redux/main/server'
import {
  useGetAllVendorsQuery,
  useUpdateVendorBlockTypeMutation,
} from '../../redux/vendorApis'

const Vendors = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  // const [userRole, setUserRole] = useState('USER')

  const { data: vendorsData, isLoading, refetch } = useGetAllVendorsQuery()
  const [updateVendorBlock] = useUpdateVendorBlockTypeMutation()

  const navigate = useNavigate()

  const transformedData =
    vendorsData?.data?.map((vendor) => ({
      key: vendor._id,
      userId: vendor.user_details._id,
      image: vendor.user_details.img.startsWith('http')
        ? vendor.user_details.img
        : `${url}/${vendor.user_details.img}`,
      userName: vendor.user_details.name,
      contactNumber: vendor.user_details.phone,
      email: vendor.user_details.email,
      totalBook: vendor.total_booking,
      subscription: vendor.user_details.block ? 'Blocked' : 'Active',
      categories: vendor.business_services.map((service) => service.name),
      reviews: vendor?.reviews?.length,
      reviewsNumber: vendor.total_rated,
      vendorType: vendor.vendor_type,
    })) || []

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.image}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://randomuser.me/api/portraits/men/1.jpg'
            }}
          />
          <span className="text-gray-900 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories) => (
        <div className="flex flex-wrap gap-2 w-[300px]">
          {categories?.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-green-100 rounded-md text-green-800"
            >
              {category}
            </span>
          ))}
          {categories?.length > 2 && (
            <span className="px-4 py-2 bg-green-100 rounded-md text-green-800">
              +{categories.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Total Bookings',
      dataIndex: 'totalBook',
      key: 'totalBook',
      render: (text) => (
        <span className="px-4 py-2 bg-blue-100 rounded-md">{text}</span>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'subscription',
      key: 'subscription',
      render: (text) => (
        <div
          className={`badge ${
            text === 'Active' ? 'bg-green-500' : 'bg-red-500'
          } text-white py-1 px-3 rounded w-[100px] flex items-center justify-center`}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<FaUserCircle />}
            className="bg-blue-800 text-white"
            onClick={() => handleViewProfile(record)}
          />
          <Button
            type="primary"
            icon={<MdBlock />}
            className={
              record.subscription === 'Active'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }
            onClick={() => confirmDeleteUser(record)}
          />
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

  const confirmDeleteUser = (user) => {
    setSelectedUser(user)
    setIsDeleteModalVisible(true)
  }

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

  return (
    <div className="mb-20">
      <h1
        className="text-xl font-semibold cursor-pointer mt-5"
        onClick={() => navigate(-1)}
      >
        ← Vendors
      </h1>
      <Table
        columns={columns}
        dataSource={transformedData}
        loading={isLoading}
        pagination={{ position: ['bottomCenter'] }}
        className="mt-5"
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
            <Image
              src={selectedUser.image}
              alt={selectedUser.userName}
              className="w-32 h-32 rounded-full mb-4 object-cover"
              width={100}
              height={100}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://randomuser.me/api/portraits/men/1.jpg'
              }}
            />
            <h2 className="text-xl font-semibold">{selectedUser.userName}</h2>
            <div className="flex items-center">
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
                {selectedUser.reviews} ({selectedUser.reviewsNumber} reviews)
              </p>
            </div>
            <p className="text-gray-600">{selectedUser.contactNumber}</p>
            <p className="text-gray-600">{selectedUser.email}</p>
            <p className="mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              {selectedUser.vendorType}
            </p>

            <div className="flex flex-wrap items-center justify-center w-full gap-2 mt-5">
              {selectedUser.categories?.map((category, index) => (
                <span
                  className="text-gray-600 mr-2 px-2 py-1 bg-blue-100 rounded-md"
                  key={index}
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 border-black mt-4">
              <div className="text-center border-r border-t border-black p-5">
                <span className="text-xl font-bold">
                  {selectedUser.totalBook}
                </span>
                <p>Total Bookings</p>
              </div>
              <div className="text-center border-t border-black p-5">
                <span className="text-xl font-bold">
                  {selectedUser.reviewsNumber}
                </span>
                <p>Total Reviews</p>
              </div>
              <div className="text-center border-r border-t border-black p-5">
                <span className="text-xl font-bold">
                  {selectedUser.totalBook}{' '}
                  {/* Replace with completed bookings if available */}
                </span>
                <p>Completed Bookings</p>
              </div>
              <div className="text-center border-t border-black p-5">
                <span className="text-xl font-bold">0</span>{' '}
                {/* Replace with cancelled bookings if available */}
                <p>Cancelled Bookings</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Modal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDeleteUser}
        okText={
          selectedUser?.subscription === 'Active'
            ? `Yes, block`
            : `Yes, unblock`
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
        <div
          className="text-lg bg-no-repeat bg-left-top bg-contain h-[200px] object-contain"
          style={{
            backgroundImage: `url(${deleteUser})`,
          }}
        >
          <div className="flex justify-center items-end">
            <IoIosWarning className="text-7xl text-yellow-400" />
          </div>
          <div className="font-bold text-5xl text-center">Warning</div>
          <div className="p-5 text-center text-red-700">
            Are you sure you want to{' '}
            {selectedUser?.subscription === 'Active' ? 'block' : 'unblock'} this
            user?
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Vendors
