import react from 'react';
import "./item.css"

const Item = (props) =>{

    return <div className="main-content">
        <img height="50" src={props.image} alt={props.name}/><br/>
        {props.name}<br/>
        ${props.price}<br/>
        Stars: {props.rating}
    </div>

}

export default Item;