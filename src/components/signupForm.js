import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const SignUpForm = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    
    return(
        <div className = 'center-row'>
            <div className = 'form-container'>
                <h3>Sign Up!</h3>
                <form className='form' onSubmit={(e)=>{props.handleSignUp(e)}} >            
                    <input type='text' placeholder='Name' value={props.name}  onChange={(e)=>{props.setName(e.target.value)}} required />      
                    <input type='email' placeholder='Email' value={props.email} onChange={(e)=>{props.setEmail(e.target.value)}} required />   
                    <input type='password' placeholder='Password' value={props.password} onChange={(e)=>{props.setPassword(e.target.value)}} required />
                    <input type='text' placeholder='City' value={props.city} onChange={(e)=>{props.setCity(e.target.value)}} required />
                    <input type='text' placeholder='State' value={props.state} onChange={(e)=>{props.setState(e.target.value)}} required />
                    <input type='text' placeholder='Zipcode' value={props.zip} onChange={(e)=>{props.setZip(e.target.value)}} required />
                    <input type='submit' value="Submit"  />
                </form>
            </div>
        </div>
    )
}

export default SignUpForm