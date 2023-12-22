import './App.css';
import { UserProvider } from './UserContext';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppNavBar from './components/AppNavBar';
// Pages
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register'
import Logout from './pages/Logout';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import ProductView from './pages/ProductView';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

function App() {
  
  const [user, setUser] = useState({
    id: null,
    isAdmin: null 
  })
  
  const unsetUser = () => {
    localStorage.clear()
  }
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data._id !== 'undefined') {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
        })
        } else {
          setUser({
            id: null,
            isAdmin: null
          })
      }
    })
  }, [])
  
  console.log(user)
  
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavBar />
          <Container>
            <Routes>
              <Route path='/' element = {<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:productId' element={<ProductView />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/cart' element={<Cart />} />
              
              
              
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
        
      </UserProvider>
    </>
  );
}

export default App;
