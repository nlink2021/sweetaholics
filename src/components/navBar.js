import { Link } from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const NavBar = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    return(
        <div className = 'page-header'>
            <div className='logo'>
            Sweet-A-Holics
            </div>

            {user!== undefined && !user.id ?
            <nav className = 'logged-out-links'>
                <Link to= '/'>Home</Link>{'|'}
                <span onClick={()=>{props.setSignupOrLogin('login')}}>
                    <Link to= '/signup-login'>Login</Link>
                </span>{'|'}
                <span onClick={()=>{props.setSignupOrLogin('signup')}}>
                    <Link to= '/signup-login'>Sign Up</Link>
                </span>
            </nav>
            :user!== undefined && user.isAdmin !== true ?
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

            :

            <nav className = 'logged-out-links'>
                <Link to= '/'>Home</Link>{'|'}
                <Link to= '/manage/products'>Manage Products</Link>{'|'}
                <Link to= '/orders'>Orders To Fill</Link>{'|'}
                <span onClick={()=>{
                    localStorage.removeItem('userId')
                    setUser([])
                }}><Link to= '/'>Logout</Link></span>      
            </nav>
           
            }
        </div>
    )}

export default NavBar