import { Link } from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import axios from 'axios'

const Sweet = (props) => {
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [added, setAdded] = useState(false)

    const addToCart = async () =>{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add`,{
            cartId: user.cart.id,
            itemId: props.item.id
        })
        console.log(res)
        if(res.data.message === 'item added'){
            setAdded(true)
        }
    }
    useEffect(()=>{setAdded(false)},[])


    return(
        <>
        {props.isPopup === false && added === false ?
            <div className = "each-sweet" onClick={()=>{props.togglePopup(props.item)}}>
                <h3>{props.item.name}</h3>
                <div>{props.item.description}</div>
                <div>${props.item.price}</div>
            </div>
        :props.isPopup === true && added === false ?
            <div className='popup-sweet'>
                <div className='sweet-title'>{props.item.name}</div>
                <div className='picture'>
                    <img src = {`${props.item.image}`}></img>
                </div>
                <div>{props.item.description}</div>
                <div>${props.item.price}.00</div>
                <button className='button add' onClick={()=>{addToCart()}}>Add To Cart</button>
            </div>
        :
            <div className='added-message'>
                <h1>Item has been added to cart!</h1>
                    <button className='button added'>
                        <Link to='/cart'id="view-cart">View Cart </Link>
                    </button>
                    <button className='button added' onClick={()=>{props.togglePopup(props.item)}}>Continue shopping</button>
            </div>
        }
        </>
    )

}
export default Sweet
