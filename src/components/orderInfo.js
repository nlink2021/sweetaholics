import moment from 'moment'
import { useEffect, useState } from 'react';

const OrderInfo = (props) =>{
    const [total, setTotal] = useState(0)
    const calcTotal = () =>{
        let prices = []
        props.orderItems.forEach(item=>{
            prices.push(item.price)
        })
        const sum = prices.reduce(add,0)
            function add(accumulator, a) {
                return accumulator + a;
            }
            setTotal(sum)
    }

    useEffect(()=>{calcTotal()},[])
    return(   
        <div className = 'order-info-container'>
            <div className='order-info'>
                <div>
                    Ordered On: <br/>
                    {moment(props.order.date).format("MMMM Do YYYY")}
                </div>
                <div>
                    Deliver To: <br/>
                    {props.order.address}<br/> 
                    {props.order.city}, {props.order.state}, {props.order.zip} 
                </div>
            </div>

            <div className='order-items'>
                {props.orderItems.map((item,i)=>
                    <div key ={i} className= 'item-info'>
                        <div>{item.name}</div>
                        <div>${item.price}.00</div>
                    </div>
                )}
            </div>
            <div className = 'order-total'>Total: ${total}.00 </div>
        </div>
   
    )
}

export default OrderInfo