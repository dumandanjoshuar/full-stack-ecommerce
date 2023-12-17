import React, { useContext, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import UserContext from "../UserContext";

function UsersOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Check if data is an array before setting state
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return user.isAdmin ? (
    <>
      <h2>Order History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Purchased On</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>
                  {order.products.map((product) => (
                    <div key={product.productId}>
                      {product.productId.name}
                    </div>
                  ))}
                </td>
                <td>
                  {order.products.map((product) => (
                    <div key={product.productId}>{product.quantity}</div>
                  ))}
                </td>
                <td>
                  {order.products.map((product) => (
                    <div key={product.productId}>{product.productId.price}</div>
                  ))}
                </td>
                <td>{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  {new Date(order.purchasedOn).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No orders available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  ) : (
    <Navigate to="/products" />
  );
}

export default UsersOrders;
