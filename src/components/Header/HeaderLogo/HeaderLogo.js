import logo from '../../../images/logo.svg';
import { Link } from 'react-router-dom';
import { LANDING_ROUTE } from '../../../utils/consts';

const HeaderLogo = () => {
    return(
        <Link to={LANDING_ROUTE}>
            <img className="header__logo" src={logo} alt="Лого" /> 
        </Link>
    );
}

export default HeaderLogo;