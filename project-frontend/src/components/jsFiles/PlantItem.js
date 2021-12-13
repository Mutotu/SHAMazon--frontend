import '../cssFiles/PlantItem.css';
import {Link} from 'react-router-dom';

function PlantItem(props) {
    return (
        <div className="PlantItem">
            <img src={props.image} alt={props.name} />
            <Link to = {String(props.id)}><h3>{props.name}</h3></Link>
            <h5>{props.price}</h5>
            
        </div>
    )
}

export default PlantItem;