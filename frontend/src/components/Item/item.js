import react from 'react';
import "./item.css"

const Item = (props) =>{

    return <div className="main-content">
        <img height="75" src={props.image} alt={props.name}/><br/>
        <hr style={{width:"5rem"}}/>
        {props.name}<br/>
        ${props.price}<br/>
        Stars: {props.rating}
    </div>

}

export default Item;