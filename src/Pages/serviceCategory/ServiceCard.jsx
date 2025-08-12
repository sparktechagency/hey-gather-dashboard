import React from 'react'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { RiEdit2Line } from 'react-icons/ri'
import { FiEdit, FiTrash } from 'react-icons/fi'

const ServiceCard = ({
  service,
  onEdit,
  onDelete,
  onAddService,
  onEditService,
  onDeleteService,
}) => {
  return (
    <div className="card glass w-80 shadow-md py-4 px-3 rounded-xl">
      <figure>
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold my-3">{service.name}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 rounded-full px-1"
            >
              <span className="bg-blue-900 text-white text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
              <button
                onClick={() => onEditService(tag)}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Edit service"
              >
                <FiEdit size={14} />
              </button>
              <button
                onClick={() => onDeleteService(tag)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Delete service"
              >
                <FiTrash size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Service Button */}
        <button
          onClick={onAddService}
          className="btn btn-success bg-blue-200 py-2 hover:bg-blue-300 w-full mb-3 flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Service
        </button>

        <div className="card-actions justify-between border-t pt-3 flex border-gray-300">
          <button
            onClick={() => onEdit(service)}
            className="btn btn-primary text-xl border-r w-full border-red-600"
          >
            <RiEdit2Line className="text-blue-800" />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="btn btn-secondary text-md w-full flex justify-end"
          >
            <FaTrashAlt className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
