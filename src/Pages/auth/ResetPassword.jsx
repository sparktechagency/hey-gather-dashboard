import { Form, Input, Button, Checkbox } from 'antd'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import hye_logo from '../../assets/hye_logo.svg'
import { useResetPasswordMutation } from '../../redux/authApis'
import { FiLoader } from 'react-icons/fi'
const ResetPassword = () => {
  const navigate = useNavigate()

  const [postResetPassword, { isLoading }] = useResetPasswordMutation()
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('reset-token')
      if (!token) {
        toast.error('Reset token not found')
        return
      }
      await postResetPassword({
        password: values.password,
        confirm_password: values.confirmPassword,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('reset-token')
          localStorage.removeItem('email')
          localStorage.removeItem('token')
          navigate('/login')
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
        <p className="text-3xl  mb-8 font-bold">Set new password</p>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="confirm password"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox className="text-gray-700">Keep me logged in</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white h-[42px] rounded-md"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Loading...
                  <FiLoader />
                </div>
              ) : (
                'Reset Password'
              )}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Link to="/login" className="text-blue-800 hover:underline ">
            Sign in instead
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
