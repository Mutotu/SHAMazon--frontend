import "../cssFiles/CartPage.css";
import PlantItem from "../../components/jsFiles/PlantItem";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function CartPage(props) {
  const navigation = useNavigate();

  const { cartState } = useContext(AppContext);
  const [cart, setCart] = cartState;

  const [totalPrice, setTotalPrice] = useState(0);

  function handleRemoveCartClick(removalIdx) {
    setCart(
      cart.filter((plant, idx) => {
        if (idx !== removalIdx) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  function createPlantItems() {
    return cart.map((plant, idx) => {
      return (
        <div className='cart-block CartPageItem'>
          <PlantItem
            key={plant.id}
            name={plant.name}
            image={plant.image}
            price={plant.price}
          />
          <button
            className='btn-remove'
            onClick={() => {
              handleRemoveCartClick(idx);
            }}
          >
            Remove from Cart
          </button>
        </div>
      );
    });
  }

  function cartTotalPrice() {
    let tempTotal = 0;
    cart.forEach((plant) => {
      let slicedPrice = Number(plant.price.slice(1, plant.price.length));
      tempTotal += slicedPrice;
    });
    setTotalPrice(tempTotal);
  }

  useEffect(cartTotalPrice, [cart]);

  return (
    <div className='CartPage'>
      {createPlantItems()}
      <h3>Total: ${totalPrice}</h3>

      <button
        className='btn'
        onClick={() => {
          totalPrice === 0 ? navigation("/shop") : navigation("/checkout");
        }}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartPage;
