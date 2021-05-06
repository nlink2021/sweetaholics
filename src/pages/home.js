import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const Home = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    return(
        <div className = 'page-container'>
            <div className='welcomeMsg'>
                Welcome to Sweetaholics! Your local bakery specializing in all sorts of delicious treats.
                Sign up or Log in now to start ordering with us to get that sugar fix now!
            </div>

        </div>
}

export default Home