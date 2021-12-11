import "../cssFiles/AllOrdersPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllOrdersPage(props) {
  //url =  "http://localhost:3001/orders/"

  const [orders, setOrders] = useState([]);

  const displayOrders = () => {
    return (
      <>
        {orders.map((item, i) => {
          let date = item.orderInfo.createdAt.slice(0, 10);
          console.log(date);
          return (
            <div>
              <li>
                <Link to={`${item.orderInfo.id}`}>{date}</Link>
              </li>
            </div>
          );
        })}
      </>
    );
  };

  const getOrders = () => {
    axios
      .get("http://localhost:3001/orders/", {
        headers: { authorization: localStorage.getItem("userId") },
      })
      .then((response) => {
        // console.log(response.data[0].plants[0]);
        console.log(response);
        setOrders(response.data);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <ul>{displayOrders()}</ul>
    </div>
  );
}

export default AllOrdersPage;
