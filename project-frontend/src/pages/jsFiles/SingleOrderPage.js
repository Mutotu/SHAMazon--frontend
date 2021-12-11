import "../cssFiles/SingleOrderPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SingleOrderPage(props) {
  const [load, setLoad] = useState(null);
  const { orderId } = useParams();
  const getData = async () => {
    try {
      const data = await axios(`http://localhost:3001/orders/${orderId}`, {
        headers: { authorization: localStorage.getItem("userId") },
      });

      console.log(data);
      setLoad(data);
    } catch (err) {
      console.log(err);
    }
  };

  const displayOrders = () => {
    return (
      <>
        <li>Ordered on : {load.data.orderInfo.createdAt.slice(0, 10)}</li>
        <li>OrderId : {load.data.orderInfo.id}</li>
        <li>
          <img src={load.data.plants[0].image} />
        </li>
        <li>Price: {load.data.plants[0].price}</li>
      </>
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='card'>
      <ul>{load ? displayOrders() : <p>Loading</p>}</ul>
    </div>
  );
}

export default SingleOrderPage;
