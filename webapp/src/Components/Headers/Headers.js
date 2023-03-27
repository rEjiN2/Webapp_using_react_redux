import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import {login, selectUser} from '../../features/userSlice'
import { change } from '../../features/usernameReducer';
import { changeImage } from '../../features/userimageReducer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
function Headers() {
 // const user = useSelector(selectUser);
  
  const obj = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = (e)=>{
    e.preventDefault();
    //
     localStorage.removeItem("userInfo")
     navigate('/')
  }
  
  const handleProfile = ()=>{
    navigate('/userProfile');
  }
     useEffect(()=>{

        axios.get(`http://localhost:5000/api/users/userDetails/${obj._id}`).then((res)=>{
          console.log(res['data'].name);
          console.log(res['data'].image);
          

          dispatch(change(res['data'].name))
          dispatch(changeImage(
            res['data'].image
          ))


         
        },[])


     })
     
     const username = useSelector((state) => state.username)
     const userImage = useSelector((state) => {
      return state.userImage;

  })
  const homeRoute = ()=>{
    navigate('/home')
  }


 
  
  
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
      <Image src={userImage}  style={{ width: '50px', height: '50px' }} alt="example image"  fluid />
        <Navbar.Brand href="#home" onClick={handleProfile} style={{color:'white'}} >{username}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link  onClick={()=>homeRoute()} style={{color:'white'}}>Home</Nav.Link>
      
            <Nav.Link href="#home" style={{marginLeft:950,color:'white'}} onClick={(e)=>handleLogout(e)} >Logout</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headers;
