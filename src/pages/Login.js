import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";



export default function Login() {
  
  const {user, setUser} = useContext(UserContext)
  
  const [ email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(false)
  
  
  function loginUser(e) {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.access) {
          localStorage.setItem('token', data.access)
          retrieveUserDetails(data.access)
          
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to my ecommerce capstone 3 project"
        })
        } else {
          Swal.fire({
            title: "Authentication Failed",
            icon: "error",
            text: "Check your login details and try again"
          })
        }
        setEmail('')
        setPassword('')
      })
      .catch(err => {
      console.error('Error during login', err)
    })
  }
  
  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
      })
    })
  }
  
  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [email, password])
  
  return (
    <Container className="your-container">
      <Row>
        <Col xs={12} md={6} className="mb-4">
          <Container className="test-users-container">
            <h2 className="mb-3">Test Users</h2>
            <div className="user-info">
              <strong>Regular User:</strong>
              <p>
                <strong>Email:</strong> user123@mail.com
                <br />
                <strong>Password:</strong> user123
              </p>
            </div>
            <div className="user-info">
              <strong>Admin User:</strong>
              <p>
                <strong>Email:</strong> admin123@mail.com
                <br />
                <strong>Password:</strong> admin123
              </p>
            </div>
          </Container>
        </Col>
        <Col xs={12} md={6}>
          {user.id !== null ? (
            <Navigate to="/products" />
          ) : (
            <Form onSubmit={(event) => loginUser(event)}>
              <h1 className="text-center mb-4">Login</h1>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="my-3 text-center">
                {isActive ? (
                  <Button variant="success" type="submit" id="submitBtn">
                    Login
                  </Button>
                ) : (
                  <Button variant="danger" type="submit" id="submitBtn" disabled>
                    Login
                  </Button>
                )}
                <Button as={NavLink} to="/register" className="ms-2" id="submitBtn">
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
  
}