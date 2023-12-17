import React, { useContext } from "react"
import UserContext from "../UserContext"
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function AppNavBar() {
  
  const { user } = useContext(UserContext)
  
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={NavLink} to='/' exact ><img src="../img/stockfinity-logo-new-removebg-preview.png" alt="stockfinity-logo" className="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
            {(user.id !== null)
              ?
            <>
              {(user.isAdmin)
                ? 
                <Nav.Link as={NavLink} to='/products' exact>Admin Dashboard</Nav.Link>
                  : 
                  <>
                    <Nav.Link as={NavLink} to='/products' exact>Products</Nav.Link>
                    <Nav.Link as={NavLink} to="/profile" exact>Profile</Nav.Link>
                    <Nav.Link as={NavLink} to="/cart" exact>Cart</Nav.Link>
                    
                  </>
            }
            <Nav.Link as={NavLink} to="/logout" exact>
              Logout
            </Nav.Link>
            </>
           : (
            <>
              <Nav.Link as={NavLink} to="/login" exact>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" exact>
                Register
              </Nav.Link>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}