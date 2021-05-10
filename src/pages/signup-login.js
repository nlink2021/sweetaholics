import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import SignUpForm from '../components/signupForm'
import LoginForm from '../components/loginForm'
import axios from 'axios'

const SignupLogin = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
  
    useEffect(()=>{
        setName('')
        setEmail('')
        setPassword('')
        setCity('')
        setState('')
        setZip('')
    },[])

    const handleSignUp = async (e) => {
        e.preventDefault()
        
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,{
            name, email, password, city, state, zip
        })
        console.log(res);
        if(res.data.message === 'Signed up'){
            localStorage.setItem('userId', res.data.user.id)
            setUser(res.data.user)
        }else{
            alert('Email already taken')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`,{
                email, password
            })
            if(res.data.message === 'login successful'){
                localStorage.setItem('userId', res.data.user.id)
                setUser(res.data.user)
            }
        } catch (error) {
            console.log(error);
            alert('Login failed')
        }
    }
    
    return(
        <div className = 'page-container'>
        {props.signupOrLogin === 'login' ?
            <LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} />
        :       
            <SignUpForm name={name} email={email} password={password} city={city} state={state} zip={zip} setName={setName} setEmail={setEmail} setPassword={setPassword} setCity={setCity} setState={setState} setZip={setZip} handleSignUp={handleSignUp}/>
        }
        </div>
    )
}

export default SignupLogin