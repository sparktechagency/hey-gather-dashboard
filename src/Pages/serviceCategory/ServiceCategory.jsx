import React, { useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Modal, Input, Form, message, Upload, Button } from 'antd'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import ServiceCard from './ServiceCard'
import { IoIosWarning } from 'react-icons/io'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '../../redux/categoryRelatedApis'
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from '../../redux/categoryServicesApis'
import { url } from '../../redux/main/server'
import toast from 'react-hot-toast'

const ServiceCategory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [form] = Form.useForm()
  const [serviceForm] = Form.useForm()
  const [deleteId, setDeleteId] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const navigate = useNavigate()

  const {
    data: categoryData,
    isLoading,
    refetch,
  } = useGetCategoryQuery({ page: 1 })
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [createService, { isLoading: isCreatingService }] =
    useCreateServiceMutation()
  const [updateService] = useUpdateServiceMutation()
  const [deleteService] = useDeleteServiceMutation()
  const [deletePassword, setDeletePassword] = useState('')
  const [editingServiceItem, setEditingServiceItem] = useState(null)

  const [isServiceDeleteModalVisible, setIsServiceDeleteModalVisible] =
    useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)

  // Transform API data to match component structure
  const services =
    categoryData?.data?.map((category) => ({
      id: category._id,
      name: category.name,
      tags: category.services?.map((service) => service.name) || [],
      image: category.img.startsWith('http')
        ? category.img
        : `${url}/${category.img}`,
      originalData: category,
    })) || []

  const handleEdit = (service) => {
    setEditingService(service)
    form.setFieldsValue({
      name: service.name,
      tags: service.tags.join(', '),
    })
    setImagePreview(service.image)
    setIsModalVisible(true)
  }

  const handleDelete = (id) => {
    setDeleteId(id)
    setIsDeleteModalVisible(true)
  }

  const handleAddNew = () => {
    setEditingService(null)
    form.resetFields()
    setImagePreview('')
    setImageFile(null)
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      const { name } = values

      if (editingService) {
        const formData = new FormData()
        formData.append('name', name)

        if (imageFile) {
          formData.append('img', imageFile)
        }

        console.log('Updating category with ID:', editingService.id)
        console.log('Name being sent:', name)

        const result = await updateCategory({
          id: editingService.id,
          body: formData,
        }).unwrap()

        console.log('Update response:', result)

        if (result.success) {
          toast.success('Category updated successfully!')
          refetch()
        } else {
          toast.error(
            'Failed to update category: ' + (result.message || 'Unknown error')
          )
        }
      } else {
        const formData = new FormData()
        formData.append('name', name)

        if (imageFile) {
          formData.append('img', imageFile)
        }

        const result = await createCategory(formData).unwrap()
        console.log('Create response:', result)

        if (result.success) {
          toast.success('Category created successfully!')
          refetch()
        } else {
          toast.error(
            'Failed to create category: ' + (result.message || 'Unknown error')
          )
        }
      }

      setIsModalVisible(false)
    } catch (error) {
      console.error('Operation failed:', error)
      toast.error('Operation failed: ' + (error.message || 'Unknown error'))
    }

    setImageFile(null)
    setImagePreview('')
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleDeleteOk = async () => {
    try {
      const categoryToDelete = services.find(
        (service) => service.id === deleteId
      )

      if (!categoryToDelete) {
        toast.error('Category not found')
        return
      }

      await deleteCategory({
        id: deleteId,
        body: {
          name: categoryToDelete.name,
          password: deletePassword,
        },
      }).unwrap()

      toast.success('Category deleted successfully!')
      refetch()
      setIsDeleteModalVisible(false)
    } catch (error) {
      toast.error(
        'Failed to delete category: ' +
          (error.data?.message || error.message || 'Unknown error')
      )
      console.error(error)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }

  const handleImageChange = ({ file }) => {
    if (file) {
      setImageFile(file.originFileObj || file)
      setImagePreview(URL.createObjectURL(file.originFileObj || file))
    }
  }

  // Service Modal functions
  const openServiceModal = (category, serviceItem = null) => {
    setCurrentCategory(category)
    setEditingServiceItem(serviceItem)
    serviceForm.resetFields()

    // Set form values
    if (serviceItem) {
      // If editing, set the service name
      serviceForm.setFieldsValue({
        name: serviceItem.name,
        category: category.id,
        serviceId: serviceItem.id,
      })
    } else {
      // If adding, just set the category ID
      serviceForm.setFieldsValue({
        category: category.id,
      })
    }

    setIsServiceModalVisible(true)
  }

  const handleServiceModalCancel = () => {
    setIsServiceModalVisible(false)
  }

  const handleServiceModalOk = async () => {
    try {
      const values = await serviceForm.validateFields()

      if (editingServiceItem) {
        const serviceData = {
          name: values.name,
          id: editingServiceItem.id,
        }

        const result = await updateService(serviceData).unwrap()

        if (result && result.success) {
          toast.success('Service updated successfully!')
          refetch()
          setEditingServiceItem(null)
          setIsServiceModalVisible(false)
        } else {
          toast.error('Failed to update service')
        }
      } else {
        const serviceData = {
          name: values.name,
          category: values.category || currentCategory.id,
        }

        const result = await createService(serviceData).unwrap()

        if (result && result.success) {
          toast.success('Service added successfully!')
          serviceForm.setFieldsValue({
            name: '',
          })
          refetch()
        } else {
          toast.error('Failed to add service')
        }
      }
    } catch (error) {
      console.log('Service Operation Failed:', error)
      toast.error(
        'Operation failed: ' +
          (error.data?.message || error.message || 'Unknown error')
      )
    }
  }

  const handleFinishAddingServices = () => {
    setIsServiceModalVisible(false)
    serviceForm.resetFields()
  }

  const handleEditService = (category, service) => {
    // Find the actual service object from the category's services
    const serviceData = category.originalData.services.find(
      (s) => s.name === service
    )
    if (serviceData) {
      openServiceModal(category, {
        id: serviceData._id,
        name: serviceData.name,
      })
    } else {
      toast.error('Service not found')
    }
  }

  const handleDeleteService = (category, service) => {
    // Find the actual service object from the category's services
    const serviceData = category.originalData.services.find(
      (s) => s.name === service
    )
    if (serviceData) {
      setServiceToDelete({
        id: serviceData._id,
        name: serviceData.name,
        categoryId: category.id,
        categoryName: category.name,
      })
      setIsServiceDeleteModalVisible(true)
    } else {
      toast.error('Service not found')
    }
  }

  // Function to confirm and execute service deletion
  const handleServiceDeleteOk = async () => {
    try {
      if (!serviceToDelete) {
        toast.error('Service not found')
        return
      }
      console.log(serviceToDelete.id)
      const result = await deleteService({
        id: serviceToDelete.id,
      }).unwrap()

      if (result && result.success) {
        toast.success('Service deleted successfully!')
        refetch()
      } else {
        toast.error(
          'Failed to delete service: ' + (result.message || 'Unknown error')
        )
      }

      setIsServiceDeleteModalVisible(false)
      setServiceToDelete(null)
    } catch (error) {
      toast.error(
        'Failed to delete service: ' +
          (error.data?.message || error.message || 'Unknown error')
      )
      console.error(error)
    }
  }

  const handleServiceDeleteCancel = () => {
    setIsServiceDeleteModalVisible(false)
    setServiceToDelete(null)
  }

  return (
    <div className="mb-20">
      <div className="mb-6 flex justify-between items-center">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => navigate(-1)}
        >
          ← Categories
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading categories...</div>
        </div>
      ) : (
        <div className="flex items-center flex-wrap gap-x-20 gap-y-5">
          <div className="card bg-gray-200 w-[320px] h-[350px] p-6 rounded-lg flex flex-col justify-center items-center">
            <button
              onClick={handleAddNew}
              className="text-blue-900 text-xl px-4 py-2 rounded-md flex items-center gap-2"
            >
              <IoAddCircleOutline className="text-[100px]" />
            </button>
            <h1 className="text-bold text-xl">Add New Category</h1>
          </div>

          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddService={() => openServiceModal(service)}
              onEditService={(serviceName) =>
                handleEditService(service, serviceName)
              }
              onDeleteService={(serviceName) =>
                handleDeleteService(service, serviceName)
              }
            />
          ))}
        </div>
      )}

      {/* Add/Edit Category Modal */}
      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={isCreating || isUpdating}
        centered
        title={
          editingService ? (
            <div className="text-xl text-center">Edit Category</div>
          ) : (
            <div className="text-xl text-center">Add Category</div>
          )
        }
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="p-5"
        >
          <Form.Item
            name="image"
            rules={[
              {
                required: !editingService,
                message: 'Please upload the category image!',
              },
            ]}
          >
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              onChange={handleImageChange}
              beforeUpload={() => false}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: '100%' }}
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: 'Please enter the category name!' },
            ]}
          >
            <Input className="h-[48px]" placeholder="Entertainment" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Service Modal */}
      <Modal
        visible={isServiceModalVisible}
        onCancel={handleServiceModalCancel}
        title={
          <div className="text-xl text-center">
            Add Service to {currentCategory?.name}
          </div>
        }
        footer={[
          <Button key="back" onClick={handleServiceModalCancel}>
            Cancel
          </Button>,
          <Button
            key="finish"
            type="default"
            onClick={handleFinishAddingServices}
          >
            Finish
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isCreatingService}
            onClick={handleServiceModalOk}
          >
            Add Service
          </Button>,
        ]}
        centered
      >
        <Form
          form={serviceForm}
          layout="vertical"
          requiredMark={false}
          className="p-5"
        >
          <Form.Item
            name="name"
            label="Service Name"
            rules={[
              { required: true, message: 'Please enter the service name!' },
            ]}
          >
            <Input className="h-[48px]" placeholder="Musician" />
          </Form.Item>

          <Form.Item name="category" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Service Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        centered
      >
        <div className="text-lg bg-no-repeat bg-left-top bg-contain object-contain">
          <div className="flex justify-center items-end">
            <IoIosWarning className="text-7xl text-red-700" />
          </div>
          <div className="font-bold text-5xl text-center">Warning</div>
          <div className="p-5 text-center text-red-700">
            Are you sure you want to delete the category{' '}
            <strong>
              {services.find((service) => service.id === deleteId)?.name}
            </strong>
            ?
          </div>
          <div className="mt-4 px-7">
            <label className="block text-gray-700 mb-2 font-bold">
              Please enter your password to confirm:
            </label>
            <Input.Password
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Enter password"
              className="w-full !h-[48px]"
            />
          </div>
        </div>
      </Modal>

      <Modal
        visible={isServiceDeleteModalVisible}
        onOk={handleServiceDeleteOk}
        onCancel={handleServiceDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        centered
      >
        <div className="text-lg bg-no-repeat bg-left-top bg-contain object-contain">
          <div className="flex justify-center items-end">
            <IoIosWarning className="text-7xl text-red-700" />
          </div>
          <div className="font-bold text-3xl text-center">Warning</div>
          <div className="p-5 text-center text-red-700">
            Are you sure you want to delete the service{' '}
            <strong>{serviceToDelete?.name}</strong> from category{' '}
            <strong>{serviceToDelete?.categoryName}</strong>?
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ServiceCategory
