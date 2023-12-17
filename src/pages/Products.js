import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import UserContext from "../UserContext";
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import AddProduct from "../components/AddProduct";
import AdminSelectionForm from "../components/SetUserAdmin";
import UsersOrders from "../components/UsersOrders";

function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('adminView');

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <>
      {user.isAdmin ? (
        <Tabs
          id="admin-tabs"
          activeKey={activeTab}
          onSelect={handleTabSelect}
          className="mb-3"
        >
          <Tab eventKey="adminView" title="Admin View">
            <AdminView productsData={products} fetchData={fetchData} />
          </Tab>
          <Tab eventKey="addProduct" title="Add Product">
            <AddProduct />
          </Tab>
          <Tab eventKey="userView" title="List of active products">
            <UserView productsData={products} />
          </Tab>
          <Tab eventKey="setUserAdmin" title="Set User as Admin">
            <AdminSelectionForm />
          </Tab>
          <Tab eventKey="allOrders" title="All orders from users">
            <UsersOrders />
          </Tab>
        </Tabs>
      ) : (
        
            <UserView productsData={products} />
          
      )}
    </>
  );
}

export default Products;
