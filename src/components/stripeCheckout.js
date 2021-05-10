import axios from 'axios'
import {useContext, useState} from 'react'
import {UserContext} from '../context/userContext'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [product] = useState({
        price: props.total
    })
    const makePayment = async (token) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/payment/checkout`,{
            customer_name: user.name,
            token: token,
            product: product

        })
        if(res.status == 200){
            const rez = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders/create`,{
              address,city,state,zip,total:props.total
            },{
                headers:{
                    Authorization: user.id
                }
            })
            if(rez.data.message === 'order created'){
                await props.cartItems.forEach(async item=>{
                    const rezz = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders/add`,{
                        orderId: rez.data.order.id,
                        itemId: item.id
                    })
                })
                const rezzz = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/empty`,{
                    cartId: props.cartId
                })
                props.setShouldRedirect(true)
            }
        }
    }

    
    return(

        <div className="orderForm">
            <h3>Order Form</h3>

            <form className="order-form">
                <label htmlFor="formName">Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /><br/>

                <label htmlFor="formName">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /><br/>

                <label htmlFor="formName">State</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} /><br/>

                <label htmlFor="formName">Zip Code</label>
                <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} /><br/>
            </form>

            <StripeCheckout 
                stripeKey = 'pk_test_51IoVTMBtNKjJS2GcZ78bHAQxdC6ePvIKYG5vLVRZ936kzcCYsaJWTdwJrtDA87njveQq51tHbZo6aa6TiLbE0tjq00dS1eeeL9'
                token = {makePayment}

            />
        </div>
    )
}

export default Stripe