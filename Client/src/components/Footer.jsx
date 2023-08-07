import { Link } from 'react-router-dom';
import logo from '../assets/Navbar/logo.png'

function Footer() {
    return (
        <>
            <footer>
                <div id="footerAbove">
                    <Link to={'/'}>
                        <div className='logoContainer'>
                            <img src={logo} alt="" />
                            <p>ClassyCasa |</p>
                            <span>Your rental furniture store</span>
                        </div>
                    </Link>
                    <ul>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>YouTube</li>
                    </ul>
                </div>
                <div id='copyright'>© Lakshay Pruthi</div>
            </footer>
        </>
    )
}

export default Footer;