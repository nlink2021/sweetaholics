import Sweet from './sweet'
import OrderInfo from './orderInfo'

const PopUp = (props) => {
    return( 
        <div className='popup'>
            <div className='close-div'>
                <button onClick={()=>{props.togglePopup({})}}className='close'>X</button>
            </div>

            {props.isSweet === true && 
                <Sweet item = {props.currentInfo} togglePopup = {props.togglePopup} isPopup = {true} />
            }

            {props.isOrder === true && 
                <OrderInfo order={props.order} orderItems={props.orderItems}/>
            }
        </div>
    )
}

export default PopUp