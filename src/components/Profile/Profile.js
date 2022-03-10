import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useForm from "../../utils/useForm";
import {
  EMAIL_PATTERN,
  LANDING_ROUTE,
  USERNAME_PATTERN_CHECK,
} from "../../utils/consts";
import Preloader from "../Movies/Preloader/Preloader";

const Profile = (props) => {
  const { values, setValues, errors, handleChange, isValid } = useForm();
  const currentUser = React.useContext(CurrentUserContext);
  const [isDisable, setIsDisable] = React.useState(false);
  const [isInputChanging, setIsInputChanging] = React.useState(false);

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  const checkValuesInput = () =>
    currentUser.name !== values.name || currentUser.email !== values.email;

  const isAccountCorrect = !checkValuesInput() || isDisable;

  const handleSubmit = (e) => {
    const { name, email } = values;
    e.preventDefault();

    props.updateProfile(name, email);
    setIsDisable(false);
    setIsInputChanging(false);
  };

  const handleInputChange = (e) => {
    handleChange(e);
    setIsInputChanging(true);
  };

  return (
    <main>
      <Header loggedIn={props.loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="profile__fields" disabled={props.preloader}>
            <div className="profile__form">
              <input
                placeholder="Имя"
                className="profile__form-input"
                type="text"
                name="name"
                minLength="2"
                maxLength="30"
                required
                value={values.name || ""}
                onChange={handleInputChange}
                pattern={USERNAME_PATTERN_CHECK}
              />
            </div>
            {errors.name && (
              <span className="validation-span">{errors.name}</span>
            )}

            <div className="profile__form">
              <input
                placeholder="E-mail"
                className="profile__form-input"
                type="email"
                name="email"
                required
                onChange={handleInputChange}
                value={values.email || ""}
                pattern={EMAIL_PATTERN}
              />
            </div>
            {errors.email && (
              <span className="validation-span">{errors.email}</span>
            )}
          </fieldset>

          {!isInputChanging && props.updateProfilelMessage.message && (
            <span
              className={`profile__message profile__message_${props.updateProfilelMessage.type}`}
            >
              {props.updateProfilelMessage.message}
            </span>
          )}

          {isAccountCorrect ? (
            <button
              className="profile__button-edit"
              type="submit"
              disabled={true}
            >
              Редактировать
            </button>
          ) : (
            <button
              className="profile__button-edit"
              type="submit"
              disabled={!isValid}
            >
              {props.preloader ? <Preloader /> : "Редактировать"}
            </button>
          )}

          {isAccountCorrect && (
            <Link
              to={LANDING_ROUTE}
              className="profile__exit-link"
              onClick={props.onSignout}
            >
              Выйти из аккаунта
            </Link>
          )}
        </form>
      </section>
    </main>
  );
};

export default Profile;
