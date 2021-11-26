import "./Techs.css";

const Techs = () => {
  return (
    <section className="techs">
      <div className="techs__main-container">
        <h2 className="techs__caption app__section-title">Технологии</h2>
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li>
            <p className="techs__type">HTML</p>
          </li>
          <li>
            <p className="techs__type">CSS</p>
          </li>
          <li>
            <p className="techs__type">JS</p>
          </li>
          <li>
            <p className="techs__type">React</p>
          </li>
          <li>
            <p className="techs__type">Git</p>
          </li>
          <li>
            <p className="techs__type">Express.js</p>
          </li>
          <li>
            <p className="techs__type">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;
