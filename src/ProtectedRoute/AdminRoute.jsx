import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  if (!localStorage.getItem('token'))
    return <Navigate to="/login" replace></Navigate>
  return children
}

export default AdminRoute
