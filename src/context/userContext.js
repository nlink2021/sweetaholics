import {useState, createContext} from 'react'
import axios from 'axios'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user,setUser] = useState({})
    const [sweets, setSweets] = useState([])
    

    const fetchUser = async () => {
        let userId = localStorage.getItem('userId') 
        if(userId){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
                headers:{
                    Authorization: userId
                }
            })
            console.log(res)
            setUser(res.data.user)
        }
    }

    const fetchSweets = async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/`)
        // console.log(res.data);
        setSweets(res.data.item)
    }








    const state = {
        userState: [user,setUser],
        sweetsState: [sweets, setSweets],
        fetchUser: fetchUser,
        fetchSweets: fetchSweets


    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}




