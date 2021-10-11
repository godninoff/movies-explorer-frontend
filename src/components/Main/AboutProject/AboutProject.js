import './AboutProject.css';

function AboutProject() {
    return(
        <section className="about-project" id="about">
            <h2 className="about-project__title app__section-title">О проекте</h2>
            <ul className="about-project__task-table">
                <li className="about-project__stages">
                    <h3 className="about-project__stages-text">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__stages-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="about-project__stages">
                    <h3 className="about-project__stages-text">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__stages-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className="about-project__sprints">
                <p className="about-project__weeks-bar">1 неделя</p>
                <p className="about-project__weeks-bar">4 недели</p>
                <p className="about-project__weeks-value">Back-end</p>
                <p className="about-project__weeks-value">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;
