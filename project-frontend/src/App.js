import "./App.css";
import NavBar from "./components/jsFiles/NavBar";
import HomePage from "./pages/jsFiles/HomePage";
import LoginPage from "./pages/jsFiles/LoginPage";
import ShopPage from "./pages/jsFiles/ShopPage";
import PlantDetailsPage from "./pages/jsFiles/PlantDetailsPage";
import CartPage from "./pages/jsFiles/CartPage";
import CheckoutPage from "./pages/jsFiles/CheckoutPage";
import AllOrdersPage from "./pages/jsFiles/AllOrdersPage";
import SingleOrderPage from "./pages/jsFiles/SingleOrderPage";


import axios from 'axios';
import env from 'react-dotenv';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { useContext, useEffect } from 'react';


function App() {
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;

  async function verifyUser() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const response = await axios.get(`${env.BACKEND_URL}/user/verify `, { headers: { authorization: userId } })
      const { password, createdAt, updatedAt, ...userRest } = response.data.verifiedUser;
      setUser(userRest);
    }
  }

  useEffect(() => { verifyUser(); }, []);

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/login'
          element={user.id ?
            <Navigate to='/shop' />
            :
            <LoginPage />
          } />

        <Route path='/shop'
          element={user.id ?
            <ShopPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/shop/:plantId'
          element={user.id ?
            <PlantDetailsPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/cart'
          element={user.id ?
            <CartPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/checkout'
          element={user.id ?
            <CheckoutPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/orders'
          element={user.id ?
            <AllOrdersPage />
            :
            <Navigate to='/login' />
          } />

        <Route path='/orders/:orderId'
          element={user.id ?
            <SingleOrderPage />
            :
            <Navigate to='/login' />
          } />
      </Routes>
    </div>
  );
}

export default App;
