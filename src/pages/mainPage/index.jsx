import React , {useContext} from "react";
import './styles.scss';
import { MyContext } from "../../components/hooks/context";

export const MainPage = () => {
  const ctx = useContext(MyContext);

  return (
    <section className={`homepage ${ctx.isBlackTheme ? "homepage__dark" : ""}`}>
      <div className="container">
        <div className="homepage__container">
          <div className="homepage__header">
            <h1 className="homepage__header-title">Добро пожаловать!</h1>
            <p className="homepage__header-text">Актуальные новости и аналитика для вас.</p>
          </div>

          <div className="homepage__section">
            <h2 className="homepage__section-title">О нас</h2>
            <p className="homepage__section-text">
              Мы — команда экспертов, предоставляющая свежие новости и глубокие аналитические материалы по самым актуальным темам.
            </p>
          </div>

          <div className="homepage__section">
            <h2 className="homepage__section-title">Наши услуги</h2>
            <ul className="homepage__section-list">
              <li>Свежие новости</li>
              <li>Обзоры продуктов</li>
              <li>Интервью с лидерами мнений</li>
              <li>Аналитические обзоры</li>
            </ul>
          </div>

          <div className="homepage__section">
            <h2 className="homepage__section-title">Свяжитесь с нами</h2>
            <p className="homepage__section-text">Мы всегда рады вашим вопросам и предложениям!</p>
            <p className="homepage__section-text">Email: <a href="mailto:puzevichk@mail.ru">puzevichk@mail.ru</a></p>
            <button className="homepage__button">Написать нам</button>
          </div>
        </div>
      </div>
    </section>
  );
};