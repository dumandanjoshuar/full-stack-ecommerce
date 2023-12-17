import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from 'react-bootstrap';
import Banner from "../components/Banner";
import Swal from "sweetalert2";

function Cart() {
  const [cart, setCart] = useState(null);
  const [removeProductId, setRemoveProductId] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/carts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    const updatedItems = (cart.items || []).map(item => {
      if (item.productId._id === productId) {
        return { ...item, quantity: newQuantity, subtotal: newQuantity * item.price };
      }
      return item;
    });

    setCart({ ...cart, items: updatedItems });

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/carts/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, quantity: newQuantity })
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeCartItem = async (productId) => {
    const updatedItems = (cart.items || []).filter(item => item.productId._id !== productId);
    setCart({ ...cart, items: updatedItems });

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/carts/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Error removing item:', error);
    }

    setRemoveProductId(null);
  };

  const addQuantity = (productId) => {
    const item = (cart.items || []).find(item => item.productId._id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const subtractQuantity = (productId) => {
    const item = (cart.items || []).find(item => item.productId._id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      // If quantity is 1, prompt user to remove the product
      setRemoveProductId(productId);
    }
  };

  const confirmRemoveProduct = async () => {
    // Remove the product from the cart and update the database
    await removeCartItem(removeProductId);

    // Reset the removeProductId state
    setRemoveProductId(null);
  };

  if (!cart) {
    return <p>Loading...</p>;
  }

  const groupedItems = (cart.items || []).reduce((acc, item) => {
    const productId = item.productId._id;
    if (!acc[productId]) {
      acc[productId] = { ...item, subtotal: item.quantity * item.price };
    } else {
      acc[productId].quantity += item.quantity;
      acc[productId].subtotal += item.quantity * item.price;
    }
    return acc;
  }, {});

  const groupedItemsArray = Object.values(groupedItems);

  const totalAmount = groupedItemsArray.reduce((total, item) => total + item.subtotal, 0);

  const handleCheckout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        cartId: cart._id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          Swal.fire({
            title: "Success",
            icon: "success"
          });
          fetchCart();
        } else {
          Swal.fire({
            title: "Error",
            icon: "error"
          });
        }
      })
      .catch(error => {
        console.error('Error during checkout: ', error);
      });
  };

  const props = {
    title: "Your cart is empty",
    subtitle: "If you wish to add product, click the button",
    to: "/products",
    buttonText: "SHOP HERE"
  };

  return (
    <Form onSubmit={e => handleCheckout(e)}>
      {groupedItemsArray.length === 0 ? (
        <div className="text-center">
          <Banner props={props} />
        </div>
      ) : (
        <div>
          <ListGroup>
            {groupedItemsArray.map(item => (
              <ListGroup.Item key={item.productId._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.productId.name}</Card.Title>
                    <Card.Text>
                      Quantity: {item.quantity}<br />
                      Price: {item.price}<br />
                      Subtotal: {item.subtotal}
                    </Card.Text>
                    <InputGroup>
                      <InputGroup.Text>
                        <Button  variant="primary" onClick={() => addQuantity(item.productId._id)}>Add</Button>
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Button variant="secondary" onClick={() => subtractQuantity(item.productId._id)}>Minus</Button>
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Button variant="danger" onClick={() => setRemoveProductId(item.productId._id)}>Delete</Button>
                      </InputGroup.Text>
                    </InputGroup>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p>Total Amount: {totalAmount}</p>
          <Button variant="success" type="submit" className="my-3" >Checkout</Button>
          {removeProductId && (
            <div>
              <p>Do you want to remove this product from the cart?</p>
              <Button variant="danger" onClick={confirmRemoveProduct}>Yes</Button>
              <Button variant="secondary" onClick={() => setRemoveProductId(null)}>No</Button>
            </div>
          )}
        </div>
      )}
    </Form>
  );
}

export default Cart;

