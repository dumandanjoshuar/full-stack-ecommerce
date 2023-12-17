import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import Swal from "sweetalert2"



function EditProduct({product, fetchData}) {
  
  const [productId, setProductId] = useState('')
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  
  const [showEdit, setShowEdit] = useState(false)
  
  const openEdit = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
      
        setProductId(data._id)
        setName(data.name)
        setDescription(data.description)
        setPrice(data.price)
      })
    
    setShowEdit(true)
  }
  
  const closeEdit = () => {
    setShowEdit(false)
    setName('')
    setDescription('')
    setPrice('')
  }
  
  const editProduct = (e) => {
    e.preventDefault()
    
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name,
        description,
        price
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        
        if (data) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product successfully Updated"
          })
          closeEdit()
          fetchData()
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again"
          })
          closeEdit()
          fetchData()
        }
    })
  }
  
  return (
  <>
    <Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>

    {/*Edit Modal*/}
    <Modal show={showEdit} onHide={closeEdit}>
      <Form onSubmit={e => editProduct(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>    
          <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} 
                required/>
          </Form.Group>
          <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)} 
                required/>
          </Form.Group>
          <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)} 
                required/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEdit}>Close</Button>
          <Button variant="success" type="submit">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
  )
}

export default EditProduct