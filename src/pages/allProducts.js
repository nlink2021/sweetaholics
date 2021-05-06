import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import Sweet from '../components/sweet'



const AllProducts = () =>{
    const [ sweets, setSweets] = useState([])
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    const getProducts = async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/`)
        setSweets(res.data.item)
    }
    useEffect(()=>{getProducts()},[])


    return(
        <div className = "itemTitle">
            <h2>All Products</h2>

        <div className = 'page-container'>
            {sweets.map(item =>
            <div key = {item.id}>
                <Sweet item = {item} />
            </div>
                )}
        </div>
        </div>
    )
}
export default AllProducts
