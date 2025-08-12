import { useState, useRef } from 'react'
import JoditEditor from 'jodit-react'
import { useNavigate } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'
import toast from 'react-hot-toast'

const AboutUs = () => {
  const navigate = useNavigate()
  const editor = useRef(null)

  const [customerContent, setCustomerContent] = useState('')
  const [selectedImages, setSelectedImages] = useState([])

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImages((prevImages) => [...prevImages, reader.result])

        if (editor.current) {
          editor.current.editor.selection.insertHTML(
            `<img src="${reader.result}" alt="Uploaded Image" style="max-width:100%; margin:10px 0; display:block;" />`
          )
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleCustomerClear = () => {
    setCustomerContent('')
    setSelectedImages([])
  }

  const handleCustomerSave = () => {
    toast.success('Content saved successfully!')
  }

  return (
    <div className="mb-10">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <h1 className="text-xl font-semibold mt-5">← About Us</h1>
      </div>

      <div className="w-full px-6 py-8 bg-white rounded-lg mt-6">
        <div className="flex flex-col w-full">
          <span>
            <label
              htmlFor="file-upload"
              className="mb-2 bg-[#0d9276] inline-flex items-center justify-center gap-2 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-600"
            >
              <FaArrowUp />
              Upload Image
            </label>
          </span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mb-4 hidden"
          />

          <div className="flex flex-wrap gap-4 mb-4">
            {selectedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Selected ${index}`}
                className="rounded-md shadow-md max-w-xs"
              />
            ))}
          </div>

          <JoditEditor
            ref={editor}
            value={customerContent}
            onBlur={setCustomerContent}
            config={{
              buttons:
                'bold,italic,underline,|,ul,ol,|,h1,h2,paragraph,|,align,|,image,link,|,source',
              height: 400,
              placeholder: 'Type here...',
            }}
            className="border rounded-md"
          />

          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleCustomerClear}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={handleCustomerSave}
              className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
