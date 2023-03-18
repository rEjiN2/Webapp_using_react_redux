import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {logout,selectUser} from '../../features/userSlice'
import { useNavigate } from 'react-router-dom';
function Headers() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = (e)=>{
    e.preventDefault();
     dispatch(logout());
      navigate('/')
  }
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
      <Image src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"  style={{ width: '20px', height: '20px' }} alt="example image"  fluid />
        <Navbar.Brand href="#home" style={{color:'white'}} >{user.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={{color:'white'}}>Home</Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="#home" style={{marginLeft:950,color:'white'}} onClick={(e)=>handleLogout(e)} >Logout</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headers;
// import React from 'react'

// function Headers() {
//   return (
//     <div>
//         <h1>PACHA </h1>
//     </div>
//   )
// }

// export default Headers