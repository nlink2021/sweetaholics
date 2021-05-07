import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import CartItem from '../components/cartItem'
import Checkout from '../components/checkout'
import Stripe from '../components/stripeCheckout'

const MyCart = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [cartItems,setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const [checkout, setCheckout] = useState(false)

    const getItems = async () =>{

        if(user.cart.id){
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/items`,{
                cartId: user.cart.id
            })
            setCartItems(res.data.items)
            let prices = []
            res.data.items.forEach((item)=>{
                prices.push(item.price)
            })
            const sum = prices.reduce(add,0)
            function add(accumulator, a) {
                return accumulator + a;
            }
            setTotal(sum)
        }

    }
  

    useEffect(()=>{getItems()},[])
    useEffect(()=>{setCheckout(false)},[])


    return(
        <div className = 'page-container'>
            <div className = 'center-row'>
                <div className = 'cart'>
                    {checkout === false ? 
                    <>
                    {cartItems.map((item,i)=>
                        <CartItem key = {i} item = {item} getItems={getItems}/>
                    )}
                    <div className = 'cartItem'>
                        <div className='cart-title'>Total:</div>
                        <div className = 'cart-price'>${total} </div>
                        <button className = 'button remove' onClick={()=>{setCheckout(true)}}>Checkout</button>
                    </div>
                     </>
                :
                    <Stripe total={total}/>
                
                }

                </div>
            </div>
        </div>
    )
}

export default MyCart
