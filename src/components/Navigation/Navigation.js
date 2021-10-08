import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { SidebarData } from './SidebarData/SidebarData';

function Navigation() {

    const location = useLocation(false);
    const [sidebar, setSidebar] = React.useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className={`header__navigation ${location.pathname === '/' ? "header__navigation_links-landing" : ''}`}>
            <div className={`header__nav-landing ${location.pathname !== '/' ? "header__nav-landing display-none" : ''} `}>
                <Link to="/signup" className="header__registration">Регистрация</Link> 
                <Link to="/signin" className="header__enter">Войти</Link> 
            </div>  
            <div className={`header__nav-movies ${location.pathname === '/' ? "header__nav-movies display-none": ''} `}>
                <div className="header__movies-links">
                    <div className="header__links-container">
                        <Link to="/movies" className="header__movies">Фильмы</Link> 
                        <Link to="/saved-movies" className="header__movies header__movies_saved">Сохранённые фильмы</Link> 
                    </div>
                    <div className="heder__account-container"> 
                        <Link to="/profile" className="header__account">Аккаунт
                        <span className="header__account-icon"></span>
                        </Link> 
                    </div>  
                </div>
            </div>
            <button className={`header__navbar ${location.pathname === '/' ? "header__navbar display-none" : ''} `}>
                <FaIcons.FaBars onClick={showSidebar} />
            </button>
                <div className={sidebar ? 'nav-menu__container active' : 'nav-menu__container'}>
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
                            <Link to="/profile" className="header__account account__sidebar">Аккаунт
                                <span className="header__account-icon"></span>
                            </Link> 
                        </ul>
                    </nav>
                </div>
        </div>  
    );
}

export default Navigation;