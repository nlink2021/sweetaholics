import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const SignUpForm = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'center'>
            <div className = 'form-container'>
                <h3>Sign Up!</h3>
                <div className='form'>            
                    <input type='text' placeholder='Name' value={props.name} onChange={(e)=>{props.setName(e.target.value)}} />       
                    <input type='text' placeholder='Email' value={props.email} onChange={(e)=>{props.setEmail(e.target.value)}} />   
                    <input type='password' placeholder='Password' value={props.password} onChange={(e)=>{props.setPassword(e.target.value)}} />
                    <input type='text' placeholder='City' value={props.city} onChange={(e)=>{props.setCity(e.target.value)}} />
                    <input type='text' placeholder='State' value={props.state} onChange={(e)=>{props.setState(e.target.value)}} />
                    <input type='text' placeholder='Zipcode' value={props.zip} onChange={(e)=>{props.setZip(e.target.value)}} />
                    <input type='submit' value="Submit" onClick={(e)=>{props.handleSignUp(e)}}  />
                </div>
            </div>
        </div>
    )
}

export default SignUpForm