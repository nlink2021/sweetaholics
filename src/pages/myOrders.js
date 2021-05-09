import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import moment from 'moment'
import PopUp from '../components/popUp'

const MyOrders = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [history, setHistory] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [showItems, setShowItems] = useState(false)

    useEffect(()=>{props.setShouldRedirect(false)},[])

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
                <div className = 'cart'>
            <div className = "history-container">
                <div className = "order-header">
                <div><h4>Order</h4></div>
                <div><h4>Address</h4></div>
                <div><h4>Total</h4></div>
                </div>
                {history.map(order=>
                    <div key = {order.id} className = 'order'>
                        <button className = 'button orderHistory' onClick={()=>{getItems(order)}} >{moment(order.date).format("MMMM Do YYYY")} </button>
                        <div>{order.address}</div>
                        <div>${order.total}</div>
                    </div>
                )}
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default MyOrders
