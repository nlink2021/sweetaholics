import './App.css';
import {useState, useEffect, useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from './context/userContext'
import NavBar from './components/navBar'
import Home from './pages/home'
import SignupLogin from './pages/signup-login'
import AllProducts from './pages/allProducts'
import MyCart from './pages/myCart'
import MyOrders from './pages/myOrders'

function App() {
  const {userState, fetchUser, fetchSweets} = useContext(UserContext)
  const [user,setUser] = userState
  const [signupOrLogin, setSignupOrLogin] = useState('')

  useEffect(()=>{fetchUser()},[])
  useEffect(()=>{fetchSweets()},[])
  return (
    <div className="App">
      <NavBar setSignupOrLogin = {setSignupOrLogin}/>
      <Route exact path= '/' render= {() => <Home />} />
      <Route exact path= '/signup-login' render= {() => {
        if(user.id){
          return <Redirect to='/' />
        }else{  
          return <SignupLogin signupOrLogin={signupOrLogin} />} 
      }} />

      <Route exact path= '/products' render={()=> <AllProducts />} />
      <Route exact path= '/cart' render={()=> <MyCart />} />
      <Route exact path= '/orders' render={()=> <MyOrders />} />




    </div>
  );
}

export default App;
