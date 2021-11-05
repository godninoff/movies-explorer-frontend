import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { SidebarData } from './SidebarData/SidebarData';
import {LANDING_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SAVED_MOVIES_ROUTE} from "../../utils/consts"

function Navigation() {

    const location = useLocation(false);
    const [sidebar, setSidebar] = React.useState(false);

    const showSidebar = () => setSidebar(!sidebar);
     
    return (
        <div className={`header__navigation ${location.pathname === LANDING_ROUTE ? "header__navigation_links-landing" : ''}`}>
            <div className={`header__nav-landing ${location.pathname !== LANDING_ROUTE ? "header__nav-landing display-none" : ''} `}>
                <Link to={REGISTRATION_ROUTE} className="header__registration">Регистрация</Link> 
                <Link to={LOGIN_ROUTE} className="header__enter">Войти</Link> 
            </div>  
            <div className={`header__nav-movies ${location.pathname === LANDING_ROUTE ? "header__nav-movies display-none": ''} `}>
                <div className="header__movies-links">
                    <div className="header__links-container">
                        <Link to={MOVIES_ROUTE} className="header__movies">Фильмы</Link> 
                        <Link to={SAVED_MOVIES_ROUTE} className="header__movies header__movies_saved">Сохранённые фильмы</Link> 
                    </div>
                    <div className="heder__account-container"> 
                        <Link to={PROFILE_ROUTE} className="header__account">Аккаунт
                        <span className="header__account-icon"></span>
                        </Link> 
                    </div>  
                </div>
            </div>
            <button className={`header__navbar ${location.pathname === LANDING_ROUTE ? "header__navbar display-none" : ''} `}>
                <FaIcons.FaBars onClick={showSidebar} />
            </button>

                <div onClick={showSidebar} className={sidebar ? 'nav-menu__container active' : 'nav-menu__container'}>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
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
                            )
                            })}
                            <Link to={PROFILE_ROUTE} className="header__account account__sidebar">Аккаунт
                                <span className="header__account-icon"></span>
                            </Link> 
                        </ul>
                    </nav>
                </div>
        </div>  
    );
}

export default Navigation;