import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'

const AllProducts = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [sweets, setSweets] = useState([])

    const getProducts = async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/`)
        console.log(res);
    }

    useEffect(()=>{getProducts()},[])

    
    return(
        <div className = 'page-container'>
            
        </div>
    )
}

export default AllProducts