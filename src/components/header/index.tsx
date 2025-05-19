import React, { FC, useState, useContext, useEffect } from "react";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MyContext } from "../hooks/context";
import { setSearchValue, clearSearchValue } from "../../store/actions";
import logo from "./img/logo.svg";
import logoWhite from "./img/logoWhite.svg";
import search from "./img/search.svg";
import searchBlack from "./img/search.svg";
import searchWhite from "./img/searchWhite.svg";
import person from "./img/person.svg";
import personWhite from "./img/personWhite.svg";
import burger from "./img/burger.svg";
import burgerWhite from "./img/burgerWhite.svg";

export const Header: FC = () => {
  const ctx = useContext(MyContext);
  const isAuth = localStorage.getItem("isAuth");
  const dispatch = useDispatch();
  const location = useLocation();

  const [localSearchValue, setLocalSearchValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchValue(localSearchValue));
    setIsSearchModalOpen(false); 
  };

  useEffect(() => {
    setLocalSearchValue("");
    dispatch(clearSearchValue());
  }, [location.pathname]);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <header className={`header ${ctx.isBlackTheme ? "header__dark" : ""}`}>
      <div className="container">
        <div className="header__wrapper">
          <Link to="/" className="header__logo">
            <img
              className="header__logo-img"
              src={ctx.isBlackTheme ? logoWhite : logo}
              alt=""
            />
          </Link>
          <div className="header__search">
            <input
              className="header__search-txt"
              type="text"
              placeholder="Поиск"
              value={localSearchValue}
              onChange={handleChange}
            />
            <button className="header__search-btn" onClick={handleSearch}>
              <img
                className="header__search-img"
                src={search}
                alt="image"
              />
            </button>
          </div>
          <button className="header__burger" onClick={toggleMenu}>
            <img
              className="header__burger-img"
              src={ctx.isBlackTheme ? burgerWhite : burger}
              alt="image"
            />
          </button>
          <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
            <span className="header__close" onClick={closeMenu}>
              x
            </span>
            <ul className="header__list">
            <button className="header__modal" onClick={openSearchModal}>
              <img
                className="header__modal-img"
                src={ctx.isBlackTheme ? searchWhite : searchBlack}
                alt="image"
              />
            </button>
            <li style={{ display: isMenuOpen ? 'block' : 'none' }} className="header__item">
                <Link to="/" className="header__link" onClick={closeMenu}>
                  Главная
                </Link>
              </li>
              <li className="header__item">
                <Link to="/sport-news" className="header__link" onClick={closeMenu}>
                  Спорт
                </Link>
              </li>
              <li className="header__item">
                <Link to="/cultural-news" className="header__link" onClick={closeMenu}>
                  Культура
                </Link>
              </li>
              <li className="header__item">
                <Link to="/entertainment-news" className="header__link" onClick={closeMenu}>
                  Развлечения
                </Link>
              </li>
              <li className="header__item">
                <Link to="/technology-news" className="header__link" onClick={closeMenu}>
                  Технологии
                </Link>
              </li>
              <li className="header__item">
                {isAuth === "true" ? (
                  isMenuOpen ? (
                    <Link
                      to="userPage"
                      className="header__link"
                      onClick={toggleMenu}
                    >
                      Профиль
                    </Link>
                  ) : (
                    <Link
                      to="userPage"
                      className="header__profile"
                      onClick={toggleMenu}
                    >
                      <img
                        className="header__profile-img"
                        src={ctx.isBlackTheme ? personWhite : person}
                        alt=""
                      />
                    </Link>
                  )
                ) : (
                  <Link
                    to="login"
                    className="header__link"
                    onClick={toggleMenu}
                  >
                    Логин
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {isSearchModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <span className="modal__close" onClick={closeSearchModal}>
              &times;
            </span>
            <input
              className="modal__search-input"
              type="text"
              placeholder="Поиск"
              value={localSearchValue}
              onChange={handleChange}
            />
            <button className="modal__search-btn" onClick={handleSearch}>
              Найти
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
