import React, { useState, useEffect } from 'react'
import logo from '../../assets/hye_logo.svg'
import { useNavigate } from 'react-router-dom'
import { Modal, Input, Button } from 'antd'
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons'
import {
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from '../../redux/subscriptionsApis'

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('monthly')
  const navigate = useNavigate()

  const { data: subscriptionData, isLoading } = useGetSubscriptionQuery()
  const [updateSubscription] = useUpdateSubscriptionMutation()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newPrice, setNewPrice] = useState('0')
  const [features, setFeatures] = useState([])
  const [subscriptionType, setSubscriptionType] = useState('monthly')

  useEffect(() => {
    if (
      subscriptionData &&
      subscriptionData.data &&
      subscriptionData.data.length > 0
    ) {
      const subData = subscriptionData.data[0]
      if (activeTab === 'monthly') {
        setNewPrice(String(subData.monthly_price || 0))
        setFeatures([...(subData.monthly_benefits || [])])
      } else {
        setNewPrice(String(subData.yearly_price || 0))
        setFeatures([...(subData.yearly_benefits || [])])
      }
    }
  }, [subscriptionData, activeTab])

  const showModal = (type) => {
    if (
      subscriptionData &&
      subscriptionData.data &&
      subscriptionData.data.length > 0
    ) {
      const subData = subscriptionData.data[0]
      setSubscriptionType(type)

      if (type === 'monthly') {
        setNewPrice(String(subData.monthly_price || 0))
        setFeatures([...(subData.monthly_benefits || [])])
      } else {
        setNewPrice(String(subData.yearly_price || 0))
        setFeatures([...(subData.yearly_benefits || [])])
      }
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleUpdate = async () => {
    if (
      !subscriptionData ||
      !subscriptionData.data ||
      subscriptionData.data.length === 0
    )
      return

    const currentData = subscriptionData.data[0]
    const updatedData = { ...currentData }

    if (subscriptionType === 'monthly') {
      updatedData.monthly_price = parseFloat(newPrice)
      updatedData.monthly_benefits = [...features]
    } else {
      updatedData.yearly_price = parseFloat(newPrice)
      updatedData.yearly_benefits = [...features]
    }

    try {
      await updateSubscription(updatedData)
      setIsModalVisible(false)
    } catch (error) {
      console.error('Failed to update subscription:', error)
    }
  }

  const handleFeatureChange = (index, event) => {
    const newFeatures = [...features]
    newFeatures[index] = event.target.value
    setFeatures(newFeatures)
  }

  const handleAddFeature = () => {
    setFeatures([...features, ''])
  }

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures)
  }

  const renderSubscriptionPlan = (type) => {
    if (
      isLoading ||
      !subscriptionData ||
      !subscriptionData.data ||
      subscriptionData.data.length === 0
    ) {
      return (
        <>
          {/* <div className="text-center py-10">
            Loading subscription details...
          </div> */}
          <button
            onClick={() => showModal(type)}
            className="w-full mt-7 bg-blue-900 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
          >
            Edit
          </button>
        </>
      )
    }

    const data = subscriptionData.data[0]
    const price = type === 'monthly' ? data.monthly_price : data.yearly_price
    const benefitsList =
      type === 'monthly' ? data.monthly_benefits : data.yearly_benefits
    const tag = type === 'monthly' ? data.monthly_tag : data.yearly_tag

    return (
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-semibold mt-10">
            {type === 'monthly' ? 'Monthly' : 'Yearly'} Plan
          </h3>
          {tag && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
              {tag}
            </span>
          )}
        </div>

        <p className="text-2xl font-bold text-blue-900">
          ${price}{' '}
          <span className="text-gray-500 text-sm">
            /{type === 'monthly' ? 'month' : 'year'}
          </span>
        </p>

        <ul className="space-y-2 text-gray-900 mt-5">
          {benefitsList &&
            benefitsList.map((feature, index) => (
              <li key={index}>✅ {feature}</li>
            ))}
        </ul>

        <button
          onClick={() => showModal(type)}
          className="w-full mt-7 bg-blue-900 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
        >
          Edit
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => navigate(-1)}
        >
          ← Subscription
        </h1>
      </div>

      <div className="max-w-[600px] mx-auto bg-white shadow-lg rounded-lg p-10 mt-20">
        <div className="flex items-center justify-center gap-5 mb-5">
          <img src={logo} alt="logo" className="w-[100px]" />
          <div className="text-4xl text-blue-900 font-bold">HYE GATHER</div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 font-semibold text-2xl ${
              activeTab === 'monthly'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>

          <button
            className={`ml-4 px-4 py-2 text-2xl font-semibold ${
              activeTab === 'yearly'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('yearly')}
          >
            Yearly
          </button>
        </div>

        {activeTab === 'monthly' && renderSubscriptionPlan('monthly')}
        {activeTab === 'yearly' && renderSubscriptionPlan('yearly')}
      </div>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={650}
      >
        <div className="p-5">
          <div className="text-4xl font-bold text-center mb-3">
            Update Subscription Price
          </div>
          <p className="text-xl text-center mb-3">
            Please fill out the details below to update the subscription
            pricing.
          </p>
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Subscription Type:
            </label>
            <Input
              value={subscriptionType === 'monthly' ? 'Monthly' : 'Yearly'}
              disabled
              placeholder="Subscription type is fixed"
              className="w-full h-[48px]"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">New Price ($):</label>
            <Input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full h-[48px]"
              placeholder="Enter new price"
              type="number"
              step="0.01"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Subscription Benefits:
            </label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e)}
                  placeholder={`Benefit ${index + 1}`}
                  className="w-full mr-2 h-[48px]"
                />
                <CloseCircleOutlined
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            ))}
            <Button
              type="dashed"
              onClick={handleAddFeature}
              icon={<PlusOutlined />}
              className="w-full h-[48px] mt-2"
            >
              Add Benefit
            </Button>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={handleCancel}
              style={{ backgroundColor: '#f44336', color: 'white' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleUpdate}
              style={{ backgroundColor: '#1976D2', color: 'white' }}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Subscription
