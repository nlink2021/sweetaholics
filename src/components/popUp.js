import Sweet from './sweet'

const PopUp = (props) => {
    return(
        <div className='popup'>
            <div className='close-div'>
                <button onClick={()=>{props.togglePopup({})}}className='close'>X</button>
            </div>
           <Sweet item = {props.currentInfo} togglePopup = {props.togglePopup} isPopup = {true} />
        </div>
    )
}

export default PopUp