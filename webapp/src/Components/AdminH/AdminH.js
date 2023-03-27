import React,{useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function AdminH() {
  const navigate = useNavigate()
  const [users,setUsers] = useState([])
 



  const fetchNotes = async() => {
    console.log("HI");
    const {data}= await axios.get('http://localhost:5000/api/users/adminHome')
     console.log(data.users,"Hiiiiii");
     setUsers(data.users)
  } 

  const userSearch=(e)=>{
    let userr=e.target.value;
    console.log(userr);
    if(!userr){
    fetchNotes();
    }
    else{
        axios.get(`http://localhost:5000/api/users/searchUser/${userr}`).then((res)=>{
          console.log(res);
         setUsers(res.data.users)
        })
    }
}



   const deleteUser =async(id)=>{
     console.log(id);
      await axios.get(`http://localhost:5000/api/users/deleteUser/${id}`)
              fetchNotes()

   }
  console.log(users);
  useEffect(()=>{
    fetchNotes()
  },[])

  // const editUser = () => {
   
    // navigate('/editUser')
    // console.log(id);
    //   await axios.get(`http://localhost:5000/api/users/editUser/${id}`).then((res)=>{
    //     console.log(res);
    //   })
  // }

  return (
    <div>
      <input class="form-control mb-3 w-25 searchadmin" onChange={userSearch} name="query" type="search" placeholder="Search" aria-label="Search"/>
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user,index)=>(
          <tr key={user._id}>
          <td>{index+1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><Button style={{marginTop:1 , width:150 ,height:40}} onClick={()=>navigate(`/editUser/${user._id}`)} variant="warning">Edit</Button>{' '}  <Button style={{marginTop:1 , width:150 ,height:40}} onClick={()=>deleteUser(user._id)}  variant="danger">Delete</Button>{' '}</td>
        </tr>
        ))}
        
      </tbody>
    </Table>
    </div>
  )
}

export default AdminH