import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const LoginForm = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'center'>
            <div className = 'form-container'>
                <h3>Login!</h3>
                <div className='form'>          
                <input type='text' placeholder='Email' value={props.email} onChange={(e)=>{props.setEmail(e.target.value)}} />   
                <input type='password' placeholder='Password' value={props.password} onChange={(e)=>{props.setPassword(e.target.value)}} />
                <input type='submit' value="Submit" onClick={(e)=>{props.handleLogin(e)}}  />
                </div>
            </div>
        </div>




    )
}

export default LoginForm