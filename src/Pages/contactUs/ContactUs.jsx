import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const ContactUs = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([''])
  const [emails, setEmails] = useState([''])

  const handleAddPhone = () => {
    setPhoneNumbers([...phoneNumbers, ''])
  }

  const handleRemovePhone = (index) => {
    const updatedPhones = phoneNumbers.filter((_, i) => i !== index)
    setPhoneNumbers(updatedPhones)
  }

  const handleAddEmail = () => {
    setEmails([...emails, ''])
  }

  const handleRemoveEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index)
    setEmails(updatedEmails)
  }

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...phoneNumbers]
    updatedPhones[index] = value
    setPhoneNumbers(updatedPhones)
  }

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails]
    updatedEmails[index] = value
    setEmails(updatedEmails)
  }
  const Navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log(values)
  }
  return (
    <>
      <h1
        className="text-xl font-semibold cursor-pointer mt-5"
        onClick={() => Navigate(-1)}
      >
        ← Contact Us
      </h1>
      <Form
        className="p-6 bg-white rounded-lg mt-5"
        onFinish={handleSubmit}
        initialValues={{ phoneNumbers: phoneNumbers, emails: emails }}
      >
        <div className="flex justify-between">
          <div className="w-1/2 pr-4">
            <h2 className="flex items-center text-lg font-medium mb-4">
              <AiOutlinePhone className="mr-2 text-teal-600" />
              Call To Us
            </h2>
            <Form.List name="phoneNumbers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} className="flex items-center mb-4">
                      <Form.Item {...field} noStyle>
                        <Input
                          placeholder="Enter phone number"
                          className="p-2 border rounded-md w-full"
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(field.name)}
                          className="ml-2 text-red-500"
                        >
                          &#10005;
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => add()}
                    className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700"
                  >
                    + Add Phone Number
                  </button>
                </>
              )}
            </Form.List>
          </div>

          <div className="w-1/2 pl-4">
            <h2 className="flex items-center text-lg font-medium mb-4">
              <AiOutlineMail className="mr-2 text-teal-600" />
              Write To Us
            </h2>
            <Form.List name="emails">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} className="flex items-center mb-4">
                      <Form.Item {...field} noStyle>
                        <Input
                          placeholder="Enter email address"
                          className="p-2 border rounded-md w-full"
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(field.name)}
                          className="ml-2 text-red-500"
                        >
                          &#10005;
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => add()}
                    className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700"
                  >
                    + Add Email
                  </button>
                </>
              )}
            </Form.List>
          </div>
        </div>
        <Form.Item className="flex justify-end items-end  mt-10">
          <Button
            type="primary"
            htmlType="submit"
            className="p-5 bg-[#0d9276] "
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ContactUs
