import '../cssFiles/PlantItem.css';

function PlantItem(props) {
    return (
        <div className="PlantItem">
            <img src={props.image} alt={props.name} />
            <h3>{props.name}</h3>
            <h5>{props.price}</h5>
        </div>
    )
}

export default PlantItem;