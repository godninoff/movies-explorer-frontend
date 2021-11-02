import React from 'react';
import Header from '../Header/Header';
import './Profile.css';
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useForm from '../../utils/useForm';
import { LANDING_ROUTE } from '../../utils/consts';
import Preloader from '../Movies/Preloader/Preloader';

function Profile(props) {
    
    const {values, setValues, errors, handleChange, isValid} = useForm({});
    const currentUser = React.useContext(CurrentUserContext);
    const [isDisable, setIsDisable] = React.useState(false);
  
    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);

    const checkValuesInput = () => 
    currentUser.name !== values.name || 
    currentUser.email !== values.email;

    const handleSubmit = (e) => {
        const { name, email } = values;
        e.preventDefault();

        props.handleUserUpdate(name, email);
        setIsDisable(false);
    }

    return(
        <main>
            <Header loggedIn={props.loggedIn}/>
            <section className="profile">
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
                    <fieldset className="profile__fields">
                        <div className="profile__form">
                            <input 
                                placeholder="Имя"
                                className="profile__form-input" 
                                type="text" 
                                name="name"
                                minLength="2"
                                maxLength="30"
                                required
                                value={values.name || ''}
                                onChange={handleChange}
                                pattern="[а-яА-ЯёЁa-zA-Z\- ]{1,}"
                            />
                        </div>
                        <div className="profile__form">
                            <input 
                                placeholder="E-mail"
                                className="profile__form-input" 
                                type="email" 
                                name="email"
                                required 
                                onChange={handleChange}
                                value={values.email || ''}
                            />
                        </div>
                        <span>{errors.email}</span>
                    </fieldset>

                    { !checkValuesInput() || isDisable
               ? <button className="profile__button-edit" type="submit" disabled={true}>Редактировать</button> 
               : <button className="profile__button-edit" type="submit" disabled={!isValid}>{props.preloader ? <Preloader /> : 'Редактировать'}</button> }

                </form>
                {
                    !checkValuesInput() || isDisable ? (<Link to={LANDING_ROUTE} className="profile__exit-link" onClick={props.onSignout}>Выйти из аккаунта</Link>) : ''
                }
                
            </section>
        </main>
    );
}

export default Profile;