import React, { FC, useState, useContext, useEffect } from 'react';
import "./styles.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "../hooks/context";
import { setSearchValue, addMiddlewareAction } from "../../store/actions";
import { limit } from "../../pages/blog";
import { getPage, getOrder } from "../../store/selectors";
import logo from "./img/logo.svg";
import logoWhite from "./img/logoWhite.svg";
import searchWhite from "./img/searchWhite.svg";
import person from "./img/person.svg";
import personWhite from "./img/personWhite.svg";
import burger from "./img/burger.svg";
import burgerWhite from "./img/burgerWhite.svg";

export const Header: FC = () => {
  const ctx = useContext(MyContext);
  const isAuth = localStorage.getItem("isAuth");
  const dispatch = useDispatch();

  const page = useSelector(getPage);
  const order = useSelector(getOrder);

  const [localSearchValue, setLocalSearchValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchValue(localSearchValue));
    //@ts-expect-error
    dispatch(addMiddlewareAction(localSearchValue, order, limit, page));
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${ctx.isBlackTheme ? "header__dark" : ""}`}>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <img
              className="header__logo-img"
              src={ctx.isBlackTheme ? logoWhite : logo}
              alt=""
            />
          </div>
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
                src={searchWhite}
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
          <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
            <span className="header__close" onClick={toggleMenu}>
              x
            </span>
            <ul className="header__list">
              <li className="header__item">
                <Link to="/blogs" className="header__link" onClick={closeMenu}>
                  Blog
                </Link>
              </li>
              <li className="header__item">
                {isAuth === "true" ? (
                  isMenuOpen ? (
                    <Link to="userPage" className="header__link" onClick={toggleMenu}>
                      Profile
                    </Link>
                  ) : (
                    <Link to="userPage" className="header__profile" onClick={toggleMenu}>
                      <img
                        className="header__profile-img"
                        src={ctx.isBlackTheme ? personWhite : person}
                        alt=""
                      />
                    </Link>
                  )
                ) : (
                  <Link to="login" className="header__link" onClick={toggleMenu}>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};