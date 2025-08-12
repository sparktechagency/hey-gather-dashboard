import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import hye_logo from '../../assets/hye_logo.svg'
import toast from 'react-hot-toast'
import { useResendOtpMutation } from '../../redux/authApis'
import { FiLoader } from 'react-icons/fi'
const ForgetPassword = () => {
  const navigate = useNavigate()

  const [postResendOtp, { isLoading }] = useResendOtpMutation()

  const [form] = Form.useForm()

  const onFinish = async (values) => {
    try {
      await postResendOtp({
        email: values.email,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('email')
          localStorage.setItem('email', values.email)
          navigate('/send-otp')
        })
    } catch (error) {
      toast.error(error?.data?.message)
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
        <p className="text-lg  m-5">Please enter the email address</p>
        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              placeholder="Enter email"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 text-white h-[42px] rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Loading...
                  <FiLoader />
                </div>
              ) : (
                'Send OTP'
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

export default ForgetPassword
