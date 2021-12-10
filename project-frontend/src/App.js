import './App.css';
import NavBar from './components/jsFiles/NavBar';
import HomePage from './pages/jsFiles/HomePage';
import LoginPage from './pages/jsFiles/LoginPage';
import ShopPage from './pages/jsFiles/ShopPage';
import PlantDetailsPage from './pages/jsFiles/PlantDetailsPage';
import CartPage from './pages/jsFiles/CartPage';
import CheckoutPage from './pages/jsFiles/CheckoutPage';
import AllOrdersPage from './pages/jsFiles/AllOrdersPage';
import SingleOrderPage from './pages/jsFiles/SingleOrderPage';

import { Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';

function App() {

  const { userState } = useContext(AppContext);
  const [user] = userState;

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:plantId' element={<PlantDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<AllOrdersPage />} />
        <Route path='/orders/:orderId' element={<SingleOrderPage />} />
      </Routes>

    </div>
  );
}

export default App;
