import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import { NavLink, Navigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Form, Button } from "react-bootstrap"



export default function Register() {
  
  const { user } = useContext(UserContext)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [isActive, setIsActive] = useState(false)
  
  function registerUser(e) {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        mobileNo,
        password,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFirstName('')
          setLastName('')
          setEmail('')
          setMobileNo('')
          setPassword('')
          setConfirmPassword('')
          
          Swal.fire({
            title: "Thank you for registering",
            icon: "success"
          })
        } else {
          Swal.fire({
            title: "Please try again",
            icon: "error"
          })
      }
    })
  }
  
  useEffect(() => {
    const isValid = 
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      mobileNo !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword
    
    setIsActive(isValid)
  }, [firstName, lastName, email, mobileNo, password, confirmPassword])
  
  return (
    (user.id !== null)
      ?
      <Navigate to='/' />
      :
      <Form onSubmit={registerUser} className="my-5">
	<h1 className="my-5 text-center">Register</h1>
	<Form.Group>
		<Form.Label>First Name:</Form.Label>
		<Form.Control 
    type="text" 
    placeholder="Enter First Name" 
    required
    value={firstName}
    onChange={e => {setFirstName(e.target.value)}}/>
	</Form.Group>
	<Form.Group>
		<Form.Label>Last Name:</Form.Label>
		<Form.Control 
    type="text" 
    placeholder="Enter Last Name" 
    required
    value = {lastName}
    onChange = {e => {setLastName(e.target.value)}}
    />
	</Form.Group>
	<Form.Group>
		<Form.Label>Email:</Form.Label>
		<Form.Control 
    type="email" 
    placeholder="Enter Email" 
    required
    value = {email}
    onChange = {e => {setEmail(e.target.value)}}
    />
	</Form.Group>
	<Form.Group>
		<Form.Label>Mobile No:</Form.Label>
		<Form.Control 
    type="number" 
    placeholder="Enter your Mobile No." 
    required
    value = {mobileNo}
    onChange = {e => {setMobileNo(e.target.value)}}
    />
	</Form.Group>
	<Form.Group>
		<Form.Label>Password:</Form.Label>
		<Form.Control 
    type="password" 
    placeholder="Enter Password" 
    required
    value = {password}
    onChange = {e => {setPassword(e.target.value)}}
    />
	</Form.Group>
	<Form.Group>
		<Form.Label>Confirm Password:</Form.Label>
		<Form.Control 
    type="password" 
    placeholder="Confirm Password" required
    value = {confirmPassword}
    onChange = {e => {setConfirmPassword(e.target.value)}}
    />
	</Form.Group>
  <div className="text-center my-3">     
  {
    isActive
    ?
	<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
  :
	<Button variant="danger" type="submit" id="submitBtn"  disabled>Submit</Button>
  }	
        </div> 
        <p className="text-center">
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </p>
</Form>
  )
}