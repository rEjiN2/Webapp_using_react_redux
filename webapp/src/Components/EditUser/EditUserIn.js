// EditUserPage.js

import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './EditUserIn.css';
import { useParams,useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loadinig';
function EditUserIn() {
  const params = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)

  
  console.log(params.id,"hi ");


   const fetchUser = async()=>{
    console.log("poli");
    const {data} = await axios.get(`http://localhost:5000/api/users/editUser/${params.id}`)
    console.log(data,"useeeeee");
    setName(data.name)
    setEmail(data.email)
    setPassword(data.password)
    console.log(name,email,password,"hi");
   }

   useEffect(()=>{
    fetchUser()
  },[])




  const handleSubmit = async(e) => {
    e.preventDefault();
    // handle form submission here
    try{
      const config = {
        headers : {
          "Content-type" : "application/json"
        },

      };
      setLoading(true)
    
      const {data} = await axios.post(
        'http://localhost:5000/api/users/userUpadte',
        {
          
           name,
           email,
           password,
           id:params.id
        },
        config
      )
       console.log(data,"gi")
       setLoading(false)
       navigate('/adminHome')
      
    }catch(error){

    }
  };

  return (
    <div className="edit-user-page">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button  type="submit">Save Changes</button>
      </form>
    </div>
  

  );
}

export default EditUserIn;
