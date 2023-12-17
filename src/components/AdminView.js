import { useEffect, useState } from "react";
import ArchiveProduct from "./ArchiveProduct";
import EditProduct from "./EditProduct";
import { Table } from "react-bootstrap";

function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(
      productsData.map((product) => (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? 'text-success' : 'text-danger'}>
            {product.isActive ? 'Available' : 'Unavailable'}
          </td>
          <td>
            <EditProduct product={product._id} fetchData={fetchData} />
          </td>
          <td>
            <ArchiveProduct productId={product._id} fetchData={fetchData} isActive={product.isActive} />
          </td>
        </tr>
      ))
    );
  }, [productsData]);

  return (
    <>
      <h1 className="text-center">Admin Dashboard</h1>
      <div className="table-responsive">
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Availability</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminView;