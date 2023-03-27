import React from 'react'
import AdminLogin from '../Components/AdminLogin/AdminLogin'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
function Admin() {
    const user = useSelector(selectUser)
  const navigate = useNavigate()
  return (
    <div>
        
        { user ?navigate('/adminHome')  : <AdminLogin/>}
    </div>
  )
}

export default Admin