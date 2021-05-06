import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const AllProducts = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'page-container'>
            All Products
        </div>
    )
}

export default AllProducts