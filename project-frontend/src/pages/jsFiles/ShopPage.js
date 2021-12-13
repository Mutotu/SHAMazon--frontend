import "../cssFiles/ShopPage.css";
import PlantItem from "../../components/jsFiles/PlantItem";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PlantDetailsPage from "./PlantDetailsPage";

function ShopPage(props) {
  const [allPlants, setAllPlants] = useState([]);
  const { cartState } = useContext(AppContext);
  const [cart, setCart] = cartState;
  const navigate = useNavigate();
  let ww = window.location.href.split("");
  
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
            id = {plant.id}
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
 
  const PlantItemsNav = allPlants.map((plant,i) => <Route path = {String(plant.id)} element = {<PlantDetailsPage click = {handleAddCartClick} plant = {plant} name = {allPlants[i].name} image = {allPlants[i].image} price = {allPlants[i].price} desc = {allPlants[i].description}/>} ></Route>
  )

  if(!isNaN(ww[ww.length - 1])){
    return(
      <Routes>
      {PlantItemsNav}
    </Routes>
    )
  }
  return (
    <div>
    {allPlants !== [] ? createPlantItems() : <h3>Loading...</h3>}
    <Routes>
      {PlantItemsNav}
    </Routes>
    </div>
  
  );
 
}

export default ShopPage;
