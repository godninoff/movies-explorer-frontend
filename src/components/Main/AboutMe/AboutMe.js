import './AboutMe.css';
import MyPhoto from '../../../images/myphoto.jpg';

const AboutMe = () => {
    return(
        <section className="about-me">
            <h2 className="about-me__title app__section-title">Студент</h2>
            <div className="about-me__main-content">
                <div className="about-me__printed-content">
                    <h3 className="about-me__name">Антон</h3>
                    <p className="about-me__working">Фронтенд-разработчик, 33 года</p>
                    <p className="about-me__bio">Я живу в Перми, закончил торгово-экономический университет им. Плеханова ПИ(ф)РЭУ. Работал супервайзером розничной сети магазинов строительных материалов с 2016 года. С начала 2021 начал изучать веб-разработку в Яндекс Практикуме. Сейчас уволился с работы, чтобы полностью посвятить себя новой профессии.</p>
                    <ul className="about-me__social-networks">
                        <li className="about-me__link">
                            <a className="about-me__link-profile" href="https://github.com/godninoff" target="_blank" rel="noreferrer">Facebook</a>
                            <a className="about-me__link-profile" href="https://github.com/godninoff" target="_blank" rel="noreferrer">Github</a>
                        </li>
                    </ul>
                </div>
                <img className="about-me__my-photo" alt="Мое фото" src={MyPhoto}/>    
            </div>
        </section>
    );
}

export default AboutMe;