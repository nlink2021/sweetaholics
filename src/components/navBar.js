import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navFont">
            <Link to="/">Home</Link>
            {'  |  '}
            <Link to="/login">Login</Link>
            {'  |  '} 
            <Link to="/signup">Signup</Link>
        </nav>
    )
}

export default NavBar