import {useContext} from 'react'
import {UserContext} from '../context/userContext'


const Checkout = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'checkout'>
            <div> Checkout </div>
            <div>Total: {props.total}</div>
        </div>
    )
}

export default Checkout