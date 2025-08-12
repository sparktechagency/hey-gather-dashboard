// import React, { useState } from 'react'
// import { Table, Button, Modal } from 'antd'
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import 'tailwindcss/tailwind.css'
// import { useNavigate } from 'react-router-dom'
// import { IoIosWarning } from 'react-icons/io'
// import deleteUser from '../../assets/delete-user.png'
// import toast from 'react-hot-toast'

// const PromoCodes = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [selectedPromo, setSelectedPromo] = useState(null)
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
//   const [promoData, setPromoData] = useState([
//     {
//       key: '1',
//       promoCode: 'NEYEAR25',
//       discountType: 'Percentage (%)',
//       discountValue: '25% Off',
//       usageLimit: '500 Uses',
//       startDate: '2025-02-13',
//       expirationDate: '2025-02-26',
//     },
//     {
//       key: '2',
//       promoCode: 'WELCOME10',
//       discountType: 'Fixed Amount ($)',
//       discountValue: '$10 Off',
//       usageLimit: '200 Uses',
//       startDate: '2025-02-13',
//       expirationDate: '2025-02-26',
//     },
//     {
//       key: '3',
//       promoCode: 'NEYEAR25',
//       discountType: 'Percentage (%)',
//       discountValue: '25% Off',
//       usageLimit: '500 Uses',
//       startDate: '2025-02-13',
//       expirationDate: '2025-02-26',
//     },
//   ])

//   const Navigate = useNavigate()

//   const columns = [
//     {
//       title: 'Promo Code',
//       dataIndex: 'promoCode',
//       key: 'promoCode',
//     },
//     {
//       title: 'Discount Type',
//       dataIndex: 'discountType',
//       key: 'discountType',
//     },
//     {
//       title: 'Discount Value',
//       dataIndex: 'discountValue',
//       key: 'discountValue',
//     },
//     {
//       title: 'Usage Limit',
//       dataIndex: 'usageLimit',
//       key: 'usageLimit',
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'startDate',
//       key: 'startDate',
//     },
//     {
//       title: 'Expiration Date',
//       dataIndex: 'expirationDate',
//       key: 'expirationDate',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <div className="flex space-x-3">
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => handleEditPromo(record)}
//             className="bg-blue-900 text-white"
//           />
//           <Button
//             icon={<DeleteOutlined />}
//             onClick={() => handleDeletePromo(record)}
//             className="bg-red-500 text-white"
//           />
//         </div>
//       ),
//     },
//   ]

//   const handleEditPromo = (promo) => {
//     setSelectedPromo(promo)
//     setIsModalVisible(true)
//   }

//   const handleDeletePromo = (promo) => {
//     setSelectedPromo(promo)
//     setIsDeleteModalVisible(true)
//   }

//   const handleConfirmDelete = () => {
//     setPromoData(promoData.filter((promo) => promo.key !== selectedPromo.key))
//     toast.success('Promo code deleted successfully!')
//     setIsDeleteModalVisible(false)
//     setSelectedPromo(null)
//   }

//   const handleCancelDelete = () => {
//     setIsDeleteModalVisible(false)
//     setSelectedPromo(null)
//   }

//   const handleCloseModal = () => {
//     setIsModalVisible(false)
//     setSelectedPromo(null)
//   }

//   const handleSavePromo = () => {
//     if (selectedPromo?.key) {
//       const updatedPromoData = promoData.map((promo) =>
//         promo.key === selectedPromo.key ? selectedPromo : promo
//       )
//       setPromoData(updatedPromoData)
//       toast.success('Promo code edited successfully!')
//     } else {
//       const newPromo = {
//         key: Date.now().toString(),
//         promoCode: selectedPromo.promoCode,
//         discountType: selectedPromo.discountType,
//         discountValue: selectedPromo.discountValue,
//         usageLimit: selectedPromo.usageLimit,
//         startDate: selectedPromo.startDate,
//         expirationDate: selectedPromo.expirationDate,
//       }
//       setPromoData([newPromo, ...promoData])
//       toast.success('Promo code added successfully!')
//     }
//     setIsModalVisible(false)
//     setSelectedPromo(null)
//   }

//   const handleInputChange = (e, field) => {
//     setSelectedPromo({ ...selectedPromo, [field]: e.target.value })
//   }

//   return (
//     <div className="mb-10">
//       <div className="flex justify-between items-center mb-4">
//         <h1
//           className="text-xl font-semibold cursor-pointer mt-5"
//           onClick={() => Navigate(-1)}
//         >
//           ← Promo Codes Management
//         </h1>
//         <button
//           type="primary"
//           className="text-white mt-5 p-2 rounded-md outline-none h-[48px] bg-blue-900"
//           onClick={() => setIsModalVisible(true)}
//         >
//           + Add New
//         </button>
//       </div>
//       <Table
//         columns={columns}
//         dataSource={promoData}
//         pagination={{
//           pageSize: 5,
//           position: ['bottomCenter'],
//         }}
//       />
//       <Modal
//         visible={isModalVisible}
//         onCancel={handleCloseModal}
//         footer={null}
//         centered
//         width={700}
//       >
//         <div className="space-y-4 p-5 text-black">
//           <div className="text-center text-4xl font-bold ">
//             {selectedPromo ? 'Edit Promo Code' : 'Add New Promo Code'}
//           </div>
//           <p className="m-5 text-center text-xl">
//             Please fill out the details below to{' '}
//             {selectedPromo ? 'edit' : 'add'} a new promo code.
//           </p>
//           <div>
//             <label className="block text-gray-700">Promo Code</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md outline-none h-[48px]"
//               value={selectedPromo?.promoCode || ''}
//               onChange={(e) => handleInputChange(e, 'promoCode')}
//               placeholder="Promo Code"
//               required
//             />
//           </div>
//           <section className="flex justify-between w-full gap-5">
//             <div className="w-full">
//               <label className="block text-gray-700">Discount Type</label>
//               <select
//                 className="w-full p-2 border rounded-md outline-none h-[48px]"
//                 value={selectedPromo?.discountType || ''}
//                 onChange={(e) => handleInputChange(e, 'discountType')}
//                 required
//               >
//                 <option value="" disabled hidden>
//                   Select Discount Type
//                 </option>
//                 <option value="Percentage">Percentage (%)</option>
//                 <option value="Fixed Amount">Fixed Amount ($)</option>
//               </select>
//             </div>
//             <div className="w-full">
//               <label className="block text-gray-700">Discount Value</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-md outline-none h-[48px]"
//                 value={selectedPromo?.discountValue || ''}
//                 onChange={(e) => handleInputChange(e, 'discountValue')}
//                 placeholder="Discount Value"
//                 required
//               />
//             </div>
//           </section>

//           <section className="flex justify-between w-full gap-5">
//             <div className="w-full">
//               <label className="block text-gray-700">Start Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded-md outline-none h-[48px]"
//                 value={selectedPromo?.startDate || ''}
//                 onChange={(e) => handleInputChange(e, 'startDate')}
//                 required
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-gray-700">Expire Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded-md outline-none h-[48px]"
//                 value={selectedPromo?.expirationDate || ''}
//                 onChange={(e) => handleInputChange(e, 'expirationDate')}
//                 required
//               />
//             </div>
//           </section>

//           <section>
//             <div className="w-full">
//               <label className="block text-gray-700">Usage Limit</label>
//               <input
//                 className="w-full p-2 border rounded-md outline-none h-[48px]"
//                 value={selectedPromo?.usageLimit || ''}
//                 onChange={(e) => handleInputChange(e, 'usageLimit')}
//                 placeholder="Usage Limit"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 required
//               />
//             </div>
//           </section>
//           <div className="flex justify-center">
//             <Button
//               type="primary"
//               onClick={handleSavePromo}
//               className="bg-blue-500 text-white"
//             >
//               {selectedPromo ? 'Save' : 'Add'}
//             </Button>
//           </div>
//         </div>
//       </Modal>

//       <Modal
//         visible={isDeleteModalVisible}
//         onCancel={handleCancelDelete}
//         onOk={handleConfirmDelete}
//         okText="Yes"
//         cancelText="Cancel"
//         centered
//         okButtonProps={{
//           style: {
//             backgroundColor: 'red',
//             borderColor: 'red',
//           },
//         }}
//         cancelButtonProps={{
//           style: {
//             backgroundColor: 'blue',
//             borderColor: 'blue',
//             color: 'white',
//           },
//         }}
//       >
//         <div
//           className="text-lg bg-no-repeat bg-left-top bg-contain h-[200px] object-contain"
//           style={{
//             backgroundImage: `url(${deleteUser})`,
//           }}
//         >
//           <div className="flex justify-center items-end">
//             <IoIosWarning className="text-7xl text-yellow-400" />
//           </div>
//           <div className="font-bold text-5xl text-center">Warning</div>
//           <div className="p-5 text-center text-red-700 w-[500px] mx-auto">
//             Are you sure you want to delete the promo code{' '}
//             {selectedPromo?.promoCode}?
//           </div>
//         </div>
//       </Modal>
//     </div>
//   )
// }

// export default PromoCodes

import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Spin } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'tailwindcss/tailwind.css'
import { useNavigate } from 'react-router-dom'
import { IoIosWarning } from 'react-icons/io'
import deleteUser from '../../assets/delete-user.png'
import toast from 'react-hot-toast'
import {
  useDeletePromoCodesMutation,
  useGetPromoCodesQuery,
  usePostPromoCodesMutation,
  useUpdatePromoCodesMutation,
} from '../../redux/promoCodesApis'

const PromoCodes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState(null)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  const { data: promoCodesData, isLoading } = useGetPromoCodesQuery({
    page: currentPage,
  })
  const [createPromoCode, { isLoading: isCreating }] =
    usePostPromoCodesMutation()
  const [updatePromoCode, { isLoading: isUpdating }] =
    useUpdatePromoCodesMutation()
  const [deletePromoCode, { isLoading: isDeleting }] =
    useDeletePromoCodesMutation()

  const columns = [
    {
      title: 'Promo Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) =>
        type === 'percentage' ? 'Percentage (%)' : 'Fixed Amount ($)',
    },
    {
      title: 'Discount Value',
      key: 'discountValue',
      render: (record) =>
        record.type === 'percentage'
          ? `${record.amount}% Off`
          : `$${record.amount} Off`,
    },
    {
      title: 'Usage Limit',
      dataIndex: 'use_limit',
      key: 'use_limit',
      render: (limit) => `${limit} Uses`,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (date) => new Date(date).toISOString().split('T')[0],
    },
    {
      title: 'Expiration Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (date) => new Date(date).toISOString().split('T')[0],
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-3">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditPromo(record)}
            className="bg-blue-900 text-white"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePromo(record)}
            className="bg-red-500 text-white"
          />
        </div>
      ),
    },
  ]

  const handleEditPromo = (promo) => {
    setSelectedPromo({
      ...promo,
      startDate: new Date(promo.start_date).toISOString().split('T')[0],
      expirationDate: new Date(promo.end_date).toISOString().split('T')[0],
      discountType: promo.type === 'percentage' ? 'Percentage' : 'Fixed Amount',
      discountValue: promo.amount.toString(),
      usageLimit: promo.use_limit.toString(),
      promoCode: promo.code,
    })
    setIsModalVisible(true)
  }

  const handleDeletePromo = (promo) => {
    setSelectedPromo(promo)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deletePromoCode({ id: selectedPromo._id }).unwrap()
      toast.success('Promo code deleted successfully!')
      setIsDeleteModalVisible(false)
      setSelectedPromo(null)
    } catch (error) {
      toast.error(
        'Failed to delete promo code: ' +
          (error.data?.message || 'Unknown error')
      )
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false)
    setSelectedPromo(null)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setSelectedPromo(null)
  }

  const handleSavePromo = async () => {
    try {
      const formattedData = {
        code: selectedPromo.promoCode,
        type:
          selectedPromo.discountType === 'Percentage' ? 'percentage' : 'fixed',
        amount: Number(selectedPromo.discountValue),
        start_date: selectedPromo.startDate,
        end_date: selectedPromo.expirationDate,
        use_limit: Number(selectedPromo.usageLimit),
        is_active: true,
      }

      if (selectedPromo._id) {
        await updatePromoCode({
          id: selectedPromo._id,
          ...formattedData,
        }).unwrap()
        toast.success('Promo code updated successfully!')
      } else {
        await createPromoCode(formattedData).unwrap()
        toast.success('Promo code added successfully!')
      }

      setIsModalVisible(false)
      setSelectedPromo(null)
    } catch (error) {
      toast.error(
        'Failed to save promo code: ' + (error.data?.message || 'Unknown error')
      )
    }
  }

  const handleInputChange = (e, field) => {
    setSelectedPromo({ ...selectedPromo, [field]: e.target.value })
  }

  const handlePaginationChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => navigate(-1)}
        >
          ← Promo Codes Management
        </h1>
        <button
          type="primary"
          className="text-white mt-5 p-2 rounded-md outline-none h-[48px] bg-blue-900"
          onClick={() => setIsModalVisible(true)}
        >
          + Add New
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={promoCodesData?.data || []}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            position: ['bottomCenter'],
            current: currentPage,
            total: promoCodesData?.pagination?.totalItems || 0,
            onChange: handlePaginationChange,
          }}
        />
      )}

      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={700}
      >
        <div className="space-y-4 p-5 text-black">
          <div className="text-center text-4xl font-bold">
            {selectedPromo?._id ? 'Edit Promo Code' : 'Add New Promo Code'}
          </div>
          <p className="m-5 text-center text-xl">
            Please fill out the details below to{' '}
            {selectedPromo?._id ? 'edit' : 'add'} a new promo code.
          </p>
          <div>
            <label className="block text-gray-700">Promo Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md outline-none h-[48px]"
              value={selectedPromo?.promoCode || ''}
              onChange={(e) => handleInputChange(e, 'promoCode')}
              placeholder="Promo Code"
              required
            />
          </div>
          <section className="flex justify-between w-full gap-5">
            <div className="w-full">
              <label className="block text-gray-700">Discount Type</label>
              <select
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.discountType || ''}
                onChange={(e) => handleInputChange(e, 'discountType')}
                required
              >
                <option value="" disabled hidden>
                  Select Discount Type
                </option>
                <option value="Percentage">Percentage (%)</option>
                <option value="Fixed Amount">Fixed Amount ($)</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Discount Value</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.discountValue || ''}
                onChange={(e) => handleInputChange(e, 'discountValue')}
                placeholder="Discount Value"
                required
              />
            </div>
          </section>

          <section className="flex justify-between w-full gap-5">
            <div className="w-full">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.startDate || ''}
                onChange={(e) => handleInputChange(e, 'startDate')}
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Expire Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.expirationDate || ''}
                onChange={(e) => handleInputChange(e, 'expirationDate')}
                required
              />
            </div>
          </section>

          <section>
            <div className="w-full">
              <label className="block text-gray-700">Usage Limit</label>
              <input
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.usageLimit || ''}
                onChange={(e) => handleInputChange(e, 'usageLimit')}
                placeholder="Usage Limit"
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
            </div>
          </section>
          <div className="flex justify-center">
            <Button
              type="primary"
              onClick={handleSavePromo}
              className="bg-blue-500 text-white"
              loading={isCreating || isUpdating}
              disabled={isCreating || isUpdating}
            >
              {selectedPromo?._id ? 'Save' : 'Add'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        visible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
        okText="Yes"
        cancelText="Cancel"
        centered
        confirmLoading={isDeleting}
        okButtonProps={{
          style: {
            backgroundColor: 'red',
            borderColor: 'red',
          },
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
          <div className="p-5 text-center text-red-700 w-[500px] mx-auto">
            Are you sure you want to delete the promo code {selectedPromo?.code}
            ?
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PromoCodes
