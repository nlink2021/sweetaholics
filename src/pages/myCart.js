import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const MyCart = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'page-container'>
            My Cart
        </div>
    )
}

export default MyCart