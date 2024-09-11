import React, { FC, useContext } from 'react';
import "./styles.scss";
import error from "./img/error.svg"
import errorWhite from "./img/errorWhite.svg"
import { MyContext } from "../../components/hooks/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NotFound: FC = () => {
  const ctx = useContext(MyContext);

  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate("/");
  };

  return (
    <section className={`not-found ${ctx.isBlackTheme ? "not-found__dark" : ""}`}>
      <div className="container">
        <div className="not-found__wrapper">
          <img className="not-found__img" src={ctx.isBlackTheme ? errorWhite : error} alt="" />
          <h1 className="not-found__title">Page not found</h1>
          <button className="not-found__btn" onClick={handleClickBack}>Back</button>
        </div>
      </div>
    </section>
  );
};
