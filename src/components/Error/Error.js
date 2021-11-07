import './Error.css';
import { Link } from "react-router-dom";
import { LANDING_ROUTE } from '../../utils/consts';

const Error = () => {

    return (
        <section className="not-found">
            <h2 className="not-found__title">404</h2>
            <p className="not-found__text">Страница не найдена</p>
            <Link to={LANDING_ROUTE} className="not-found__link">Назад</Link>
        </section>
    );
}

export default Error;