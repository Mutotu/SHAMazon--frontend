import "../cssFiles/ShopPage.css";
import PlantItem from "../../components/jsFiles/PlantItem";

import axios from "axios";
import env from "react-dotenv";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ShopPage(props) {
  const [allPlants, setAllPlants] = useState([]);

  const { cartState } = useContext(AppContext);
  const [cart, setCart] = cartState;

  async function getAllPlants() {
    const response = await axios.get(`${env.BACKEND_URL}/plants`);

    setAllPlants(response.data.allPlants);
  }

  function handleAddCartClick(plant) {
    setCart([...cart, plant]);
  }

  function createPlantItems() {
    return allPlants.map((plant, idx) => {
      return (
        <div className="ShopPageItem" key={plant.id}>
          <PlantItem
            name={plant.name}
            image={plant.image}
            price={plant.price}
          />
          <button
            className="btn" onClick={() => {
              handleAddCartClick(plant);
            }}
          >
            Add to Cart
          </button>
        </div>
      );
    });
  }

  useEffect(() => {
    getAllPlants();
  }, []);

  return (
    <div className="ShopPage">{allPlants !== [] ? createPlantItems() : <h3>Loading...</h3>}</div>
  );
}

export default ShopPage;
