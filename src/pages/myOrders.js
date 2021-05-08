import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import moment from 'moment'
import PopUp from '../components/popUp'

const MyOrders = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [history, setHistory] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [showItems, setShowItems] = useState(false)

    const togglePopup = () =>{
        setShowItems(!showItems)
    }


    const allOrders = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/all`,{
            headers:{
                Authorization: userId
            }
        })
        console.log(res)
        setHistory(res.data.orders)
    }

    useEffect(() => {
        allOrders()
    }, [] )

    const getItems = async (order) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders/items`, {
            orderId: order.id
        })
        setOrderItems(res.data.items)
        setCurrentOrder(order)
        togglePopup()
    }
    


    return(
        <>
         {showItems === true &&
            <PopUp togglePopup={togglePopup} isOrder={true} order={currentOrder} orderItems = {orderItems} /> 
        }
        <div className = 'page-container'>
            <div className = 'center-row'>
            <div className = "history-container">
                {history.map(order=>
                    <div key = {order.id} className = 'order'>
                        <div onClick={()=>{getItems(order)}} >{moment(order.date).format("MMMM Do YYYY")} </div>
                        <div>{order.address}</div>
                        <div>${order.total}</div>
                    </div>
                )}
                </div>
            </div>
        </div>
        </>
    )
}

export default MyOrders
