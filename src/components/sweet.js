import { Link } from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const Sweet = (props) => {
    return(
        <div className = "sweet-container">
                <h3>{props.item.name}</h3>
                {/* <img scr ={props.item.image}/> */}
                <p>{props.item.description}</p>
                <p>{props.item.price}</p>
                <p>{props.item.type}</p>
        </div>

    )

}
export default Sweet
