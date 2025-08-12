import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import hye_logo from '../../assets/hye_logo.svg'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useVerifyEmailOtpMutation } from '../../redux/authApis'
import { FiLoader } from 'react-icons/fi'
const SendOtp = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [form] = Form.useForm()
  const validateOtp = () => {
    const joinedOtp = otp.join('')
    if (joinedOtp.length !== 6) {
      return Promise.reject(new Error('Please enter a 6-digit code!'))
    }
    return Promise.resolve()
  }
  const [postVerifyAccount, { isLoading }] = useVerifyEmailOtpMutation()

  const onFinishOtp = async () => {
    const email = localStorage.getItem('email') || ''
    if (!email) {
      navigate('/forget-password')
    }
    try {
      await postVerifyAccount({
        email: email,
        code: otp.join(''),
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('reset-token')
          console.log('reset token', res?.data?.resetToken)
          console.log('token', res?.data?.token)
          localStorage.setItem('reset-token', res?.data?.resetToken)
          navigate('/reset-password')
        })
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center w-[500px] mx-auto">
      <div className=" shadow bg-white flex flex-col justify-center items-center w-full  p-12 rounded-md">
        <img src={hye_logo} alt="logo" />
        <h1 className="text-4xl font-bold  m-2 viga-text app-default-color ">
          HYE GATHER
        </h1>
        <h1 className="text-3xl font-bold  mb-2 ">Forget Password</h1>
        <p className="text-lg  m-5">Please enter your OTP</p>

        <Form
          layout="vertical"
          onFinish={onFinishOtp}
          className="w-full max-w-sm"
        >
          <Form.Item
            style={{ textAlign: 'center' }}
            name="otp"
            rules={[{ validator: validateOtp }]}
          >
            <div className="flex gap-2  justify-center">
              {otp.map((_, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  maxLength={1}
                  className="w-12 h-[42px] text-center border-gray-300 rounded-md"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white h-[42px] rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Loading...
                  <FiLoader />
                </div>
              ) : (
                'Next'
              )}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-blue-800  poppins-text">
          <Link
            to="/login"
            className=" poppins-text text-blue-800  hover:underline "
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SendOtp
