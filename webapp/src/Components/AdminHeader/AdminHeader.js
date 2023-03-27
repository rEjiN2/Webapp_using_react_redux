import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {logout,selectUser} from '../../features/userSlice'
import {useNavigate} from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
function AdminHeader() {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogout = (e)=>{
    e.preventDefault();
     dispatch(logout());
      navigate('/admin')
  }
  return (
    <div>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">User</Nav.Link>
            <Nav.Link href="#pricing">Product</Nav.Link>
            <NavDropdown title="Sub Admin" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            <Nav.Link onClick={(e)=>handleLogout(e)}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default AdminHeader;
