import { useContext, useState } from "react"
import UserContext from "../UserContext"
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"


function AddProduct() {
  
  const { user } = useContext(UserContext)
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  // const [image, setImage] = useState(null)
  
  function addNew(e) {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}/products/add-product`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name,
        description,
        price,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          Swal.fire({
            title: "Product Added",
            icon: "success",
            text: "A new product has been added to the list"
        })
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again"
          })
      }
      })
    setName('')
    setDescription('')
    setPrice('')
  }
  return (
    (user.isAdmin === false)
      ?
      <Navigate to="/products" />
      :
      <Form onSubmit={(e) => addNew(e)}>
        <h1>Add Product</h1>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add your product name here"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add your product description here"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Add your product price here"
            required
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3" >Add Product</Button>
      </Form>
    

  )
}

export default AddProduct