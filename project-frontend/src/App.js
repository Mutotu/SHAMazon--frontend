import './App.css';
import Header from './components/jsFiles/Header';
import HomePage from './pages/jsFiles/HomePage';
import LoginPage from './pages/jsFiles/LoginPage';
import ShopPage from './pages/jsFiles/ShopPage';
import PlantDetailsPage from './pages/jsFiles/PlantDetailsPage';
import CartPage from './pages/jsFiles/CartPage';
import CheckoutPage from './pages/jsFiles/CheckoutPage';
import AllOrdersPage from './pages/jsFiles/AllOrdersPage';
import SingleOrderPage from './pages/jsFiles/SingleOrderPage';

import axios from 'axios';
import env from 'react-dotenv';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { useContext, useEffect } from 'react';


function App() {
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;

  async function verifyUser() {
    const userId = localStorage.getItem('shamazon_token');
    if (userId) {
      const response = await axios.get(`${env.BACKEND_URL}/user/verify `, { headers: { authorization: userId } })
      setUser(response.data.user);
    }
  }

  useEffect(() => { verifyUser(); }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/login'
          element={user.authorization ?
            <Navigate to='/shop' />
            :
            <LoginPage />
          } />

        <Route path='/shop'
          element={user.authorization ?
            <ShopPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/shop/:plantId'
          element={user.authorization ?
            <PlantDetailsPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/cart'
          element={user.authorization ?
            <CartPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/checkout'
          element={user.authorization ?
            <CheckoutPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/orders'
          element={user.authorization ?
            <AllOrdersPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/orders/:orderId'
          element={user.authorization ?
            <SingleOrderPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
