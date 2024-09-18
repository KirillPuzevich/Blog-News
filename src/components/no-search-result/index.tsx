import React, { FC } from "react";
import "./styles.scss";
import notFound from "./img/notFound.png";
import { useNavigate } from "react-router-dom";

export const NoSearchResult: FC = () => {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="no-result">
      <img className="no-result__img" src={notFound} alt="No results found" />
      <h2 className="no-result__title">No searched result!</h2>
      <button className="no-result__btn" onClick={handleClickBack}>
        Back
      </button>
    </div>
  );
};
