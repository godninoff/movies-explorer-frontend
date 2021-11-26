import "./Navigation.css";
import { Link } from "react-router-dom";
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { SidebarData } from "./SidebarData/SidebarData";
import {
  LOGIN_ROUTE,
  MOVIES_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SAVED_MOVIES_ROUTE,
} from "../../utils/consts";

const Navigation = (props) => {
  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div
      className={props.loggedIn ? "header__navigation" : "header__nav-landing"}
    >
      {props.loggedIn && (
        <div className="header__auth">
          <div className="header__links-container">
            <Link to={MOVIES_ROUTE} className="header__movies">
              Фильмы
            </Link>
            <Link
              to={SAVED_MOVIES_ROUTE}
              className="header__movies header__movies_saved"
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div className="heder__account-container">
            <Link to={PROFILE_ROUTE} className="header__account">
              Аккаунт
              <span className="header__account-icon"></span>
            </Link>
          </div>
        </div>
      )}
      {!props.loggedIn && (
        <div className="header__nav-landing">
          <Link to={REGISTRATION_ROUTE} className="header__registration">
            Регистрация
          </Link>
          <Link to={LOGIN_ROUTE} className="header__enter">
            Войти
          </Link>
        </div>
      )}

      {props.loggedIn && (
        <button className="header__navbar">
          <FaIcons.FaBars onClick={showSidebar} />
        </button>
      )}

      <div
        onClick={showSidebar}
        className={
          sidebar ? "nav-menu__container active" : "nav-menu__container"
        }
      >
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" onClick={showSidebar}>
                <IoIcons.IoMdClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <Link
              to={PROFILE_ROUTE}
              className="header__account account__sidebar"
            >
              Аккаунт
              <span className="header__account-icon"></span>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
