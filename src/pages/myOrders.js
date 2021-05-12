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
    const [allOrders, setAllOrders] = useState([])

    const togglePopup = () =>{
        setShowItems(!showItems)
    }

    const getAllOrders = async () =>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/manage/all`)
        setAllOrders(res.data.orders)
    }

    const getHistory = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/all`,{
            headers:{
                Authorization: userId
            }
        })
        setHistory(res.data.orders)
    }
    
    const getItems = async (order) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders/items`, {
            orderId: order.id
        })
        setOrderItems(res.data.items)
        setCurrentOrder(order)
        togglePopup()
    }

    const shipOrder = async (order) =>{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/orders/manage/ship`,{
            orderId: order.id
        })
        console.log(res);
        if(res.data.message === 'order shipped'){
            getAllOrders()
        }
    }
    
    useEffect(()=>{props.setShouldRedirect(false)},[])
    useEffect(() => {getHistory()},[])
    useEffect(()=>{getAllOrders()},[])
    
    return(
        <>
        {showItems === true &&
           <PopUp togglePopup={togglePopup} isOrder={true} order={currentOrder} orderItems = {orderItems} />
        }

        {user.isAdmin === true ?
             <div className = 'page-container'>
             <div className = 'center-row'>
                <div className = 'cart'> 
                    <h2>Pending</h2>  
                    <div className = "order pending">
                        <div><h4>Order</h4></div>
                        <div><h4>Address</h4></div>
                        <div><h4>Total</h4></div>
                    </div>
                    {allOrders.map(order=>
                        order.shipped !== true &&
                        <div key = {order.id} className = 'order pending'>
                            <div className='date' onClick={()=>{getItems(order)}} >{moment(order.date).format("MMMM Do YYYY")} </div>
                            <div>{order.address}</div>
                            <div>${order.total}</div>
                            <button onClick={()=>{shipOrder(order)}}>Ship Order</button>
                        </div>
                    )}         
                </div>

                <div className = 'cart'> 
                    <h2>Shipped</h2>  
                    <div className = "order pending">
                        <div><h4>Order</h4></div>
                        <div><h4>Address</h4></div>
                        <div><h4>Total</h4></div>
                    </div>
                    {allOrders.map(order=>
                        order.shipped === true &&
                        <div key = {order.id} className = 'order pending'>
                            <div className = 'date' onClick={()=>{getItems(order)}} >{moment(order.date).format("MMMM Do YYYY")} </div>
                            <div>{order.address}</div>
                            <div>${order.total}</div>
                        </div>
                    )}         
                </div>
            </div>
         </div>

        :

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
        }
       </>
    )
}

export default MyOrders
