import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const MyOrders = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'page-container'>
            My Orders
        </div>
    )
}

export default MyOrders