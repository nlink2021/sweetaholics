import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const LoginForm = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'center-row'>
            <div className = 'form-container'>
                <h3>Login!</h3>
                <form className='form'  onSubmit={(e)=>{props.handleLogin(e)}}  >          
                <input type='text' placeholder='Email' value={props.email} onChange={(e)=>{props.setEmail(e.target.value)}} required/>   
                <input type='password' placeholder='Password' value={props.password} onChange={(e)=>{props.setPassword(e.target.value)}} required/>
                <input type='submit' value="Submit"/>
                </form>
            </div>
        </div>




    )
}

export default LoginForm