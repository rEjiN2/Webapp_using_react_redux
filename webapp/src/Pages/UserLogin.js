import React from 'react'
import Login from '../Components/Login/Login'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
function UserLogin() {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  return (
    <div>
 { user ?navigate('/home')  : <Login/> }
    </div>
  )
}

export default UserLogin