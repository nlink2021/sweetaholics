import {useContext, useState, useEffect} from 'react'
import {UserContext} from '../context/userContext'
import Sweet from '../components/sweet'
import PopUp from '../components/popUp'



const AllProducts = (props) =>{
    const {userState, sweetsState, fetchSweets} = useContext(UserContext)
    const [user,setUser] = userState
    const [sweets, setSweets] = sweetsState
    const [currentInfo, setCurrentInfo] = useState({})
    const [showInfo, setShowInfo] = useState(false)

    const togglePopup = (item) =>{
        setCurrentInfo(item)
        setShowInfo(!showInfo)
    }

    useEffect(()=>{props.setShouldRedirect(false)},[])


    return(
        <>
        {showInfo === true &&
            <PopUp togglePopup={togglePopup} currentInfo={currentInfo} isSweet={true} /> 
        }
        <div className = 'page-container'>
            <div className = 'center-column'>
                <div className='title'>Cinnies</div>
                <div className = 'sweets-section'>
                    {sweets.map(item =>
                    item.type === 'Cinnamon Roll' &&
                        <Sweet key = {item.id} item = {item} togglePopup={togglePopup} isPopup={false}/>
                    )}
                </div>
                <div className='title'>Cookies</div>
                <div className = 'sweets-section'>
                    {sweets.map(item =>
                    item.type === 'Cookie' &&
                        <Sweet key = {item.id} item = {item} togglePopup={togglePopup} isPopup={false} />
                    )}
                </div>
                <div className='title'>Brownies</div>
                <div className = 'sweets-section'>
                    {sweets.map(item =>
                    item.type === 'Brownie' &&
                        <Sweet key = {item.id} item = {item} togglePopup={togglePopup} isPopup={false} />
                    )}
                </div>                  
            </div>
         </div>
       </>
    )
}
export default AllProducts
