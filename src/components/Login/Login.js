import './Login.css';
import { Link } from "react-router-dom";
import HeaderLogo from '../Header/HeaderLogo/HeaderLogo';

function Login() {
    return(
        <main>
            <section className="login">
                <HeaderLogo />
                <h2 className="login__title auth__title">Рады видеть!</h2>
                <form className="login__form auth__form" >
                    <fieldset className="login__fields auth__fields">
                        <p className="login-inputs__text auth-inputs__text">E-mail</p>
                        <input className="login_inputs auth_inputs" type="email" placeholder="pochta@yandex.ru" required></input>
                        <p className="login-inputs__text auth-inputs__text">Пароль</p>
                        <input className="login_inputs auth_inputs" type="password" required></input>
                        <span className="login__error auth__error"></span>
                    </fieldset>
                </form>
                <button className="login__bottom-button auth__bottom-button">Войти</button>
                <p className="login__bottom-text auth__bottom-text">Ещё не зарегистрированы?
                    <Link to="/signup" className="login__link-nav auth__link-nav">Регистрация</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;