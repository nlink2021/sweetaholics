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
import ManageProducts from './pages/manageProducts'

function App() {
  const {userState, fetchUser, fetchSweets} = useContext(UserContext)
  const [user,setUser] = userState
  const [signupOrLogin, setSignupOrLogin] = useState('')
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(()=>{fetchUser()},[])
  useEffect(()=>{fetchSweets()},[])
  useEffect(()=>{setShouldRedirect(false)},[])
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

      <Route exact path= '/products' render={()=> {
         if(!user.id){
          return <Redirect to='/' />
        }else{  
          return <AllProducts setShouldRedirect={setShouldRedirect} />
        } 
      }} />
      
      <Route exact path= '/cart' render={()=> {
        if(shouldRedirect === true){
          return <Redirect to = '/orders' />
        }else if(!user.id){
          return <Redirect to='/' />
        }else{
          return <MyCart setShouldRedirect={setShouldRedirect}/>
        } 
      }} />
      
      <Route exact path= '/orders' render={()=> {
         if(!user.id){
          return <Redirect to='/' />
        }else{  
          return <MyOrders setShouldRedirect={setShouldRedirect} />
        } 
      }} />

      <Route exact path= '/manage/products' render={()=> {
         if(!user.id){
          return <Redirect to='/' />
        }else if(user.isAdmin === null || user.isAdmin === false){  
          return <Redirect to='/' />
        }else if(user.isAdmin === true){
          return <ManageProducts />
        }
      }} />
    </div>
  );
}

export default App;
