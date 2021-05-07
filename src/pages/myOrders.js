import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'

const MyOrders = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [history, setHistory] = useState([])


const allOrders = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/all`)
    console.log(res)

    }

    useEffect(() => {
        allOrders()
    }, [] )
    

    return(
        <div className = 'page-container'>
            {/* <div className = "history-container">
            {history.map(item=>
                        <div key = {cart.id}>
                            {item.name}
                        </div>
                    )}
            </div> */}
        </div>
    )
}

export default MyOrders
