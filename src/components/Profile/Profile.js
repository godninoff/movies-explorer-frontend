import Header from '../Header/Header';
import './Profile.css';
import { Link } from "react-router-dom";

function Profile() {
    return(
        <main>
            <Header />
            <section className="profile">
                <h2 className="profile__title">Привет, Антон!</h2>
                <form className="profile__form">
                    <fieldset className="profile__fields">
                        <div className="profile__form">
                            <p className="profile__form-name">Имя</p>
                            <input className="profile__form-input" type="text" placeholder="Антон" required/>
                        </div>
                        <div className="profile__form">
                            <p className="profile__form-name">E-mail</p>
                            <input className="profile__form-input" type="email" placeholder="pochta@yandex.ru" required />
                        </div>
                    </fieldset>
                </form>
                <button className="profile__button-edit">Редактировать</button>
                <Link to="/" className="profile__exit-link">Выйти из аккаунта</Link>
            </section>
        </main>
    );
}

export default Profile;