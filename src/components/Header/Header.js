import './Header.css';
import logo from '../../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
    const location = useLocation(false);

    return(
        <header className={`header ${location.pathname === '/' ? "header_landing-background" : ''}`}>
            <div className="heder__container">
            <Link to="/">
                <img className="header__logo" src={logo} alt="Лого" />
            </Link>
            <Navigation /> 
            </div>
        </header>
    )
}

export default Header