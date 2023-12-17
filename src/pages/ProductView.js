import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import { Button, Card, CardBody, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1); // Set a default quantity
  const [subTotal, setSubTotal] = useState(0)
  
  
  

  const buyProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId,
        quantity: parseInt(quantity, 10)
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // Handle error cases
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.error,
          });
        } else if (data.message === "Product added to cart successfully") {
          // Handle success case
          Swal.fire({
            title: "Successfully added to cart",
            icon: "success",
            text: "You successfully added the item to the cart",
          });
        }
      })
      .catch((error) => {
        // Handle network or unexpected errors
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred while processing your request.",
        });
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setSubTotal(data.subTotal)
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId, quantity]);
  
  function addQuantity(){
    setQuantity(quantity + 1);
  }
  function subtractQuantity(){
    if(quantity > 1){
      setQuantity(quantity - 1);
    }
  }


  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description: </Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price: </Card.Subtitle>
              <Card.Text>PHP {price}</Card.Text>
              {user.id !== null ? (
                user.isAdmin ? (
                  <>
                    <Button disabled>Admin User Cannot Add to Cart</Button>
                  </>
                ) : (
                  <>
                    <InputGroup className="quantity mb-3">            
                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4" size="sm" onClick={subtractQuantity}>-</Button>
                  
                  <Form.Control className="text-center"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />

                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4" size="sm" onClick={addQuantity}>+</Button>              
                </InputGroup>

                    <Button
                      variant="primary"
                      block
                      onClick={() => buyProduct(productId)}
                    >
                      Add to Cart
                    </Button>
                  </>
                )
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Log in to Add Product
                </Link>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductView;
