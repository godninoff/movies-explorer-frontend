import "./Register.css";
import { Link } from "react-router-dom";
import HeaderLogo from "../Header/HeaderLogo/HeaderLogo";
import useForm from "../../utils/useForm";
import Preloader from "../Movies/Preloader/Preloader";
import { LOGIN_ROUTE, USERNAME_PATTERN_CHECK } from "../../utils/consts";

const Register = (props) => {
  const { handleChange, values, errors, resetForm, isValid } = useForm();

  const handleSubmit = (e) => {
    const { name, email, password } = values;
    e.preventDefault();

    props.onRegister(email, password, name);
    resetForm({}, {}, false);
  };

  return (
    <section className="register">
      <HeaderLogo />
      <h2 className="register__title auth__title">Добро пожаловать!</h2>
      <form className="register__form auth__form" onSubmit={handleSubmit}>
        <fieldset className="register__fields auth__fields">
          <p className="register__form_name auth-inputs__text">Имя</p>
          <input
            className="register__form-input auth_inputs"
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            onChange={handleChange}
            pattern={USERNAME_PATTERN_CHECK}
          />
          {errors.name && (
            <span className="validation-span">{errors.name}</span>
          )}

          <p className="register__form_email auth-inputs__text">E-mail</p>
          <input
            className="register__form-input auth_inputs"
            type="email"
            name="email"
            required
            value={values.email || ""}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="validation-span">{errors.email}</span>
          )}

          <p className="register__form_password auth-inputs__text">Пароль</p>
          <input
            className="register__form-input auth_inputs"
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
          className="register__button auth__bottom-button"
          type="submit"
          name="submit"
          disabled={!isValid}
        >
          {props.preloader ? <Preloader /> : "Зарегистрироваться"}
        </button>
      </form>
      <p className="register__bottom-text auth__bottom-text">
        Уже зарегистрированы?
        <Link to={LOGIN_ROUTE} className="register__nav auth__link-nav">
          {""}Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
