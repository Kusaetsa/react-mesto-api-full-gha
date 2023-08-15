import React from "react";
import logo from '../images/header-logo.svg';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header ({ userEmail, setUserEmail }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [isBurgerOpen, setBurgerOpen] = React.useState(false);

    function signOut() {
        localStorage.removeItem('jwt');
        setUserEmail();     
        setBurgerOpen(false);
        navigate("/sign-in");
    }

    function handleBurger() {
        setBurgerOpen(!isBurgerOpen);
    }


    return(
        <header className = "header">
        <img src={logo} className = "header__logo" alt="логотип место" />

        {location.pathname === "/" && 
            <>
            <div className={`burger ${isBurgerOpen ? 'burger_state_open' : 'burger_state_close'}`} onClick={handleBurger}></div>
            <div className= {`header__user-info ${isBurgerOpen ? 'header_open' : ''}`}>
                <p className = "header__email">{userEmail}</p>
                <Link to="/sign-in" className="header__navlink header__logout" onClick={signOut}>Выйти</Link>
            </div>
            </>
        }
        {location.pathname === "/sign-in" && <Link to="/sign-up" className= "header__navlink">Регистрация</Link>}
        {location.pathname === "/sign-up" && <Link to="/sign-in" className= "header__navlink">Войти</Link>}
    </header>
    )
}

export default Header;