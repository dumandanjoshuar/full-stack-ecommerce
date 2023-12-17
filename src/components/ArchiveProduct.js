import { Button } from "react-bootstrap"
import Swal from "sweetalert2"


function ArchiveProduct({ productId, fetchData, isActive }) {
  
  const archiveToggle = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/archive/${productId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          Swal.fire({
            title: "Product Disabled",
            icon: "success",
            text: "Product has been disabled from the product menu"
          })
          fetchData()
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again"
          })
          fetchData()
      }
    })
  }
  
  const activeToggle = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/activate/${productId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          Swal.fire({
            title: "Product Disabled",
            icon: "success",
            text: "Product has been disabled from the product menu"
          })
          fetchData()
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again"
          })
          fetchData()
      }
    })
  }
  
  
  
  return (
    <>
      {(isActive === true)
        ?
        <Button variant="danger" onClick={archiveToggle} size="sm">Archive</Button>
        :
        <Button variant="success" onClick={activeToggle} size="sm">Activate</Button>
    }
    </>
  )
}

export default ArchiveProduct