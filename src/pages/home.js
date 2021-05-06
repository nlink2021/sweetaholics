import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const Home = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    return(
        <div className = 'page-container'>
            Home Page
        </div>
    )
}

export default Home