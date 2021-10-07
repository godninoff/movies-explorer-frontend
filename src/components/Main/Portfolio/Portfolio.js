import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://godninoff.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт
                    <span className="portfolio__arrow-link">&#8599;</span>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://godninoff.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт
                    <span className="portfolio__arrow-link">&#8599;</span>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://strannoe.mesto.nomoredomains.work/sign-in" target="_blank" rel="noreferrer">Одностраничное приложение
                    <span className="portfolio__arrow-link">&#8599;</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;