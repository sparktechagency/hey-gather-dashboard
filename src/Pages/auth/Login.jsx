import { Form, Input, Checkbox, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import hye_logo from '../../assets/hye_logo.svg'
import { useSignInMutation } from '../../redux/authApis'
import { FiLoader } from 'react-icons/fi'

const Login = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [postSignIn, { isLoading }] = useSignInMutation()

  const onFinish = async (values) => {
    console.log(values)
    try {
      await postSignIn({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.setItem('token', res?.token)

          navigate('/')
        })
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen  flex flex-col justify-center items-center p-12 ">
      <div className="bg-white flex flex-col justify-center items-center p-12">
        <img src={hye_logo} alt="logo" />
        <h1 className="text-4xl font-bold  m-2 viga-text app-default-color ">
          HYE GATHER
        </h1>
        <p className="text-3xl  font-semibold ">Login to account!</p>
        <p className="m-5">Please enter your email and password to continue</p>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="w-full max-w-md"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                message: 'Please enter your username or email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input
              placeholder="Enter Email"
              className="poppins-text h-[42px]  px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter password"
              className=" poppins-text h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox className="text-gray-700 poppins-text">
              Remember Password
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full cursor-pointer poppins-text bg-blue-900 hover:bg-blue-800 text-white h-[42px] rounded-md flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Loading...
                  <FiLoader />
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="">Forgot password?</span>{' '}
          <span className="text-gray-500 text-sm"></span>{' '}
          <Link
            to={`/forget-password`}
            className="text-[#0033A0] hover:underline  "
          >
            Forget password
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
