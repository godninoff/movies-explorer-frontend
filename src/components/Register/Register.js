import './Register.css';
import { Link } from "react-router-dom";
import HeaderLogo from '../Header/HeaderLogo/HeaderLogo';


function Register() {
    return(
        <main>
            <section className="register">
                <HeaderLogo />
                <h2 className="register__title auth__title">Добро пожаловать!</h2>
                <form className="register__form auth__form">
                    <fieldset className="register__fields auth__fields">
                        <p className="register__form_name auth-inputs__text">Имя</p>
                        <input className="register__form-input auth_inputs" type="text" placeholder="Антон" required></input>
                        <p className="register__form_email auth-inputs__text">E-mail</p>
                        <input className="register__form-input auth_inputs" type="email" placeholder="pochta@yandex.ru" required></input>
                        <p className="register__form_password auth-inputs__text">Пароль</p>
                        <input className="register__form-input auth_inputs" type="password" placeholder="••••••••••••••" required></input>
                        <span className="register__error auth__error">Что-то пошло не так...</span>
                    </fieldset>
                </form>
                <button className="register__button auth__bottom-button">Зарегистрироваться</button>
                <p className="register__bottom-text auth__bottom-text">Уже зарегистрированы?
                    <Link to="/signin" className="register__nav auth__link-nav">{''}Войти</Link>
                </p>
            </section>
        </main>
    );
}

export default Register;