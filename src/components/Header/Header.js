import "./Header.css";
import logo from "../../images/logo.svg";
import { useLocation, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { LANDING_ROUTE } from "../../utils/consts";

const Header = (props) => {
  const location = useLocation(false);

  return (
    <header
      // set background header landing page
      className={`header ${
        location.pathname === LANDING_ROUTE
          ? "header_main-page"
          : "header_other-route"
      }
      `}
    >
      <div className="header__container">
        <Link to={LANDING_ROUTE}>
          <img className="header__logo" src={logo} alt="Лого" />
        </Link>
        <Navigation loggedIn={props.loggedIn} />
      </div>
    </header>
  );
};

export default Header;
