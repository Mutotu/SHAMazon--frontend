import "../cssFiles/CheckoutPage.css";
import axios from "axios";
import env from "react-dotenv";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

function CheckoutPage(props) {
  //get the cartstate obj from AppContext
  const { cartState } = useContext(AppContext);
  const [cart, setCart] = cartState;
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [creditNum, setCreditNum] = useState("");

  //to sumbit user inf
  const submitUserInfo = (e) => {
    e.preventDefault();
    const address = { street: street };
    axios
      .post(
        "http://localhost:3001/orders/new",
        {
          address,
          creditNum,

          plants: cart,
        },
        { headers: { authorization: localStorage.getItem("userId") } }
      )
      .then((response) => {
        // console.log(response);
      });
  };
  return (
    <div>
      <form onSubmit={submitUserInfo}>
        <input
          type='text'
          placeholder='Enter street'
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Enter city'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Enter state'
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />

        <input
          type='text'
          placeholder='Enter zip'
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Enter credit number'
          value={creditNum}
          onChange={(e) => {
            setCreditNum(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // console.log(street);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
