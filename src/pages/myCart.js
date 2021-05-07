import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'

const MyCart = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [cartItems,setCartItems] = useState([])

    const getItems = async () =>{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/items`,{
            cartId: user.cart.id
        })
        if (res.data.items.length > 0){
           setCartItems(res.data.items)
        }


    }

    useEffect(()=>{getItems()},[])

    return(
        <div className = 'page-container'>
            <div className = 'center-row'>
                <div className = 'cart'>
                    {cartItems.map(item=>
                        <div key = {item.id}>
                            {item.name}
                        </div>
                    )}
                 </div>
            </div>
        </div>
    )
}

export default MyCart
