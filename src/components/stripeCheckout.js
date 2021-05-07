import axios from 'axios'
import {useContext, useState} from 'react'
import {UserContext} from '../context/userContext'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [product] = useState({
        price: props.total
    })
    const makePayment = async (token) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/payment/checkout`,{
            customer_name: user.name,
            token: token,
            product: product

        })
        console.log(res);
    }

    
    return(
        <div>
            <StripeCheckout 
                stripeKey = 'pk_test_51IoVTMBtNKjJS2GcZ78bHAQxdC6ePvIKYG5vLVRZ936kzcCYsaJWTdwJrtDA87njveQq51tHbZo6aa6TiLbE0tjq00dS1eeeL9'
                token = {makePayment}

            />
        </div>
    )
}

export default Stripe