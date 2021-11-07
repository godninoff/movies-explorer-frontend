import './Promo.css';
import promo_map from '../../../images/promo-map.svg';


const Promo = () => {
    return (
      <section className="promo">
        <div className="promo__container">
          <div className="promo__main-content">
            <div className="promo__info">
              <h1 className="promo__title">Учебный проект студента факультета Веб&#x2011;разработки.</h1>  
              <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            </div> 
              <img className="promo__map" alt="Карта мира" src={promo_map} />
          </div>
          <div className="promo__btn-wrap">
            <a className="promo__learn-more-btn" href="#about">Узнать больше</a>
          </div>
        </div>
      </section>
    );
  }
  
  export default Promo;