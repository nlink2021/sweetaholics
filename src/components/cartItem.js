import axios from 'axios'
import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const CartItem = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    const removeItem = async () =>{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/delete`,{
            cartId: user.cart.id,
            itemId: props.item.id
        })
        if(res.data.message === 'item removed from cart'){
            props.getItems()
        }
    }
    
    return(
        <div className = "cartItem">
            <div className = 'cart-title'>{props.item.name}</div>
            <div className = 'cart-price'>${props.item.price}</div>
            <button className = 'button remove' onClick={()=>{removeItem()}}>Remove</button>
        </div>
    )
}

export default CartItem