import {useContext} from 'react'
import {UserContext} from '../context/userContext'
import { Link } from 'react-router-dom';

const NavBar = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    return(
        <div className = 'page-header'>
            <h1>Sweet-A-Holics</h1>
            {!user.id ?
            <nav className = 'logged-out-links'>
                <Link to= '/'>Home</Link>{'|'}
                <span onClick={()=>{props.setSignupOrLogin('login')}}>
                    <Link to= '/signup-login'>Login</Link>
                </span>{'|'}
                <span onClick={()=>{props.setSignupOrLogin('signup')}}>   
                    <Link to= '/signup-login'>Sign Up</Link>
                </span>
            </nav>          
            :
            <nav className = 'logged-in-links'>  
                <Link to= '/'>Home</Link>{'|'}
                <Link to= '/products'>All Products</Link>{'|'}
                <Link to= '/orders'>My Orders</Link>{'|'}
                <Link to= '/cart'>Cart</Link>{'|'}
                <span onClick={()=>{
                    localStorage.removeItem('userId')
                    setUser([])
                }}><Link to= '/'>Logout</Link></span>             
            </nav>          
            }
        </div>
    )
}

export default NavBar