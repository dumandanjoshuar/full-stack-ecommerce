import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";

function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data._id !== "undefined") {
          setDetails(data);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/user-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
      });
  }, []);

  return (
    user.id === null ? (
      <Navigate to="/products" />
    ) : (
      <>
        <h1>Profile</h1>
        <Container>
          <Row>
            <Col>
              <h2>User Information</h2>
              <h3>Name:</h3>
              <p><strong>{details.firstName} {details.lastName}</strong></p>
              <h3>Email:</h3>
              <p><strong>{details.email}</strong></p>
              <h3>Mobile No:</h3>
              <p><strong>{details.mobileNo}</strong></p>
            </Col>
            <Col>
              <h2>Order History</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Purchased On</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {order.products.map(product => (
                          <div key={product.productId} style={{ whiteSpace: 'nowrap' }}>
                            {product.productId.name}
                          </div>
                        ))}
                      </td>
                      <td>
                        {order.products.map(product => (
                          <div key={product.productId}>
                            {product.quantity}
                          </div>
                        ))}
                      </td>
                      <td>
                        {order.products.map(product => (
                          <div key={product.productId}>
                            {product.productId.price}
                          </div>
                        ))}
                      </td>
                      <td>{order.totalAmount}</td>
                      <td>{order.status}</td>
                      <td>{new Date(order.purchasedOn).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
}

export default Profile;
