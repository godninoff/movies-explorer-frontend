import './Footer.css';

const Footer = () => {
    return (
        <section className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <nav className="footer__column">
                <p className="footer__copyright">© {(new Date().getFullYear())}</p>
                <ul className="footer__links">
                    <li className="footer__list">
                        <a className="footer__link" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    </li >
                    <li className="footer__list">
                        <a className="footer__link" href="https://github.com/godninoff" target="_blank" rel="noreferrer">Github</a>
                    </li>
                    <li className="footer__list">
                        <a className="footer__link" href="https://github.com/godninoff" target="_blank" rel="noreferrer">Facebook</a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Footer;