import { useState, useContext, useEffect } from "react";
import { MyContext } from "../../components/hooks/context.tsx";
import styles from "./styles.scss";
import back from "./img/back.svg";
import backWhite from "./img/backWhite.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authorizationMiddlewareAction } from "../../store/actions/index.ts";
import { ModalLogin } from "../../components/modalLogin/index.tsx";
import { ModalError } from "../../components/modalError/index.tsx";

export const Login = () => {
  const ctx = useContext(MyContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.content);

  const [values, setValues] = useState({ email: "", password: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  const handleChangeEmail = (event) => {
    setValues((prevState) => ({ ...prevState, email: event.target.value }));
  };

  const handleChangePass = (event) => {
    setValues((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const handleSave = () => {
    dispatch(authorizationMiddlewareAction(values, navigate, setRequestStatus));
  };

  useEffect(() => {
    if (requestStatus !== null) {
      if (requestStatus === 200) {
        setModalOpen(true);
        setErrorModalOpen(false);
      } else {
        setErrorModalOpen(true);
        setModalOpen(false);
      }
    }
  }, [requestStatus]);

  const closeModal = () => {
    setModalOpen(false);
    navigate("/");
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
    setRequestStatus(null);
  };

  return (
    <div className={`login ${ctx.isBlackTheme ? "login__dark" : ""}`}>
      <div className="container">
        <div className="login__wrapper">
          <Link to={"/blogs"} className="login__btn">
            <img
              className="login__btn-img"
              src={ctx.isBlackTheme ? backWhite : back}
              alt="back"
            />
          </Link>
          <h1 className="login__title">Login</h1>
          <label className="login__label" htmlFor="loginEmail">
            Email
          </label>
          <input
            type="text"
            className="login__input"
            id="loginEmail"
            placeholder="Your email"
            value={values.email}
            onChange={handleChangeEmail}
          />
          <label className="login__label" htmlFor="loginPass">
            Password
          </label>
          <input
            type="password"
            className="login__input"
            id="loginPass"
            placeholder="Password"
            value={values.password}
            onChange={handleChangePass}
          />
          <button className="login__save" onClick={handleSave}>
            Sign In
          </button>
          <div className="login__registr">
            Don't have an account?
            <Link to={"/registration"} className="login__registr-btn">
              Registration
            </Link>
          </div>
        </div>
      </div>
      <ModalLogin isOpen={isModalOpen} onClose={closeModal} />
      <ModalError isOpen={isErrorModalOpen} onClose={closeErrorModal} />
    </div>
  );
};
