import logo from '../assets/Navbar/logo.png'
import truck from '../assets/Navbar/truck.png'
import user from '../assets/Navbar/user.png'
import About from '../assets/Navbar/About.png'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { MainContext } from '../Pages/Main'

function Navbar() {
    const { loggedIn } = useContext(MainContext)
    return (
        <>
            <nav>
                <Link to={'/'}> <div className='logoContainer'>
                    <img src={logo} alt="Logo" id="Logo" />
                    <h4>ClassyCasa</h4>
                </div>
                </Link>
                <ul id="navCatagory">
                    <NavLink to={'Category/Office'}><li>Office</li></NavLink>
                    <NavLink to={'Category/Living Room'}><li>Living Room</li></NavLink>
                    <NavLink to={'Category/Kitchen'}><li>Kitchen</li></NavLink>
                    <NavLink to={'Category/Bedroom'}><li>Bedroom</li></NavLink>
                    <NavLink to={'Category/Kids'}><li>Kids</li></NavLink>
                    <NavLink to={'Category/Dining'}><li>Dining</li></NavLink>
                </ul>
                <div id='otherOptions'>
                    <Link to='About'><img src={About} alt="" /></Link>
                    <Link to='UserOrders'><img src={truck} alt="" /></Link>
                    <Link to={loggedIn ? 'User' : 'login'}><img src={user} alt="" /></Link>
                </div>
            </nav>
        </>
    )
}
export default Navbar;