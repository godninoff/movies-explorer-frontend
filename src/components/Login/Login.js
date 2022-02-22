import "./Login.css";
import { Link } from "react-router-dom";
import HeaderLogo from "../Header/HeaderLogo/HeaderLogo";
import useForm from "../../utils/useForm";
import Preloader from "../Movies/Preloader/Preloader";
import { EMAIL_PATTERN, REGISTRATION_ROUTE } from "../../utils/consts";

const Login = (props) => {
  const { handleChange, values, errors, resetForm, isValid } = useForm();

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();

    props.onLogin(email, password);
    resetForm({}, {}, false);
  };

  return (
    <main>
      <section className="login">
        <HeaderLogo />
        <h2 className="login__title auth__title">Рады видеть!</h2>
        <form className="login__form auth__form" onSubmit={handleSubmit}>
          <fieldset
            className="login__fields auth__fields"
            disabled={props.preloader}
          >
            <p className="login-inputs__text auth-inputs__text">E-mail</p>
            <input
              className="login_inputs auth_inputs"
              type="email"
              name="email"
              required
              value={values.email || ""}
              onChange={handleChange}
              pattern={EMAIL_PATTERN}
            />
            {errors.email && (
              <span className="validation-span">{errors.email}</span>
            )}

            <p className="login-inputs__text auth-inputs__text">Пароль</p>
            <input
              className="login_inputs auth_inputs"
              type="password"
              name="password"
              required
              minLength="8"
              value={values.password || ""}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="validation-span">{errors.password}</span>
            )}
          </fieldset>
          {props.onResponseError && (
            <span className="validation-span">{props.onResponseError}</span>
          )}
          <button
            className="login__bottom-button auth__bottom-button"
            disabled={!isValid}
          >
            {props.preloader ? <Preloader /> : "Войти"}
          </button>
        </form>
        <p className="login__bottom-text auth__bottom-text">
          Ещё не зарегистрированы?
          <Link
            to={REGISTRATION_ROUTE}
            className="login__link-nav auth__link-nav"
          >
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
