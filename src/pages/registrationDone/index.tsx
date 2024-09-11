import React, { FC, useContext } from "react";
import "./styles.scss";
import { MyContext } from "../../components/hooks/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ILocationState {
  email: string;
}

export const RegistrationDone: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ctx = useContext(MyContext);

  const { email } = location.state as ILocationState;

  const handleClickHome = () => {
    navigate("/login");
  };

  return (
    <div className={`confirm ${ctx.isBlackTheme ? "confirm__dark" : ""}`}>
      <div className="container">
        <div className="confirm__wrapper">
          <h1 className="confirm__title">Registration Confirmation</h1>
          <div className="confirm__content">
            <p className="confirm__content-text">
              Please activate your account with the activation
            </p>
            <p className="confirm__content-text">
              Link in the email <strong>{email}</strong>
            </p>
            <p className="confirm__content-text">Please check your email</p>
          </div>
          <button className="confirm__btn" onClick={handleClickHome}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};