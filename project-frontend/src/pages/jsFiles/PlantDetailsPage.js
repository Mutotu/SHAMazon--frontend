import '../cssFiles/PlantDetailsPage.css';

function PlantDetailsPage(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <img src = {props.image}></img>
            <p>{props.price}</p> 
            <p>{props.desc}</p>
            <button onClick={() => {
              props.click(props.plant);
            }}>add to cart</button>
        </div>
    )
}

export default PlantDetailsPage;