import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import Loading from '../Loading/Loadinig'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
const Login = () => {
     const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [image,setImage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(()=>{
      const userInfo = localStorage.getItem("userInfo");
      if(userInfo){
        navigate('/home')
      }
    },[navigate])


   const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
    const config ={
      headers:{
        "Content-type":"application/json"
      }
    }
    setLoading(true)
         

    const {data} = await axios.post(
      'http://localhost:5000/api/users/login',
      {
        email,
        password
      },
      config
    )
     console.log(data.image,"set");
     setImage(data.image)
    localStorage.setItem("userInfo",JSON.stringify(data))

    setLoading(false)
     navigate('/home')
    } catch(error){
        setError(error.response.data.message)
        setLoading(false)

    }

    dispatch(login({
      name:name,
      email:email,
      password:password,
      image:image,
      loggedIn:true,
    }));
   }
   const handleRegister = ()=>{
        navigate('/signup')
   }
  return (
    <div className='login'>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage> }
      {loading && <Loading/>}
          <form className='login__form' onSubmit={(e) => handleSubmit(e)} >
            <h1>Login Here</h1>
            <input type="name" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button style={{marginLeft:20}} type='submit' className='log'>Submit</button>
            <button style={{marginLeft:20}} onClick={()=>handleRegister()}  className='log'>Register ?</button>
            


          </form>
      

    </div>
  )
}

export default Login