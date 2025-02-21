import { useState, useContext } from "react";
import { MyContext } from "../../components/hooks/context.tsx";
import styles from "./styles.scss";
import home from "./img/home.svg";
import homeWhite from "./img/homeWhite.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUpMiddlewareAction } from "../../store/actions/index.ts";
import { urlApi } from "../../serviceWorkerRegistration.tsx";

export const Registration = () => {
  const ctx = useContext(MyContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleChangeName = (event) => {
    setValues((prevState) => ({ ...prevState, username: event.target.value }));
  };

  const handleChangeEmail = (event) => {
    setValues((prevState) => ({ ...prevState, email: event.target.value }));
  };

  const handleChangePass = (event) => {
    setValues((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.username) {
      newErrors.username = "Name is required.";
    }
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!values.password) {
      newErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkUsernameEmail = async () => {
    const response = await fetch(`${urlApi}auth/check-username-email?username=${values.username}&email=${values.email}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        await checkUsernameEmail(); 
        await dispatch(signUpMiddlewareAction(values, navigate));
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          global: error.message,
        }));
      }
    }
  };

  return (
    <div className={`registration ${ctx.isBlackTheme ? "registration__dark" : ""}`}>
      <div className="container">
        <div className="registration__wrapper">
          <Link to={"/"} className="registration__btn">
            <img
              className="registration__btn-img"
              src={ctx.isBlackTheme ? homeWhite : home}
              alt="back"
            />
          </Link>
          <h1 className="registration__title">Registration</h1>
          {errors.global && (
        <p className="registration__error">{errors.global}</p>
      )}
          <label className="registration__label" htmlFor="registrationName">
            Name
          </label>
          <input
            type="text"
            className="registration__input"
            id="registrationName"
            placeholder="Your name"
            value={values.username}
            onChange={handleChangeName}
          />
          {errors.username && (
            <p className="registration__error">{errors.username}</p>
          )}
          <label className="registration__label" htmlFor="registrationEmail">
            Email
          </label>
          <input
            type="text"
            className="registration__input"
            id="registrationEmail"
            placeholder="Your email"
            value={values.email}
            onChange={handleChangeEmail}
          />
          {errors.email && (
            <p className="registration__error">{errors.email}</p>
          )}
          <label className="registration__label" htmlFor="registrationPass">
            Password
          </label>
          <input
            type="password"
            className="registration__input"
            id="registrationPass"
            placeholder="Password"
            value={values.password}
            onChange={handleChangePass}
          />
          {errors.password && (
            <p className="registration__error">{errors.password}</p>
          )}
          <button className="registration__save" onClick={handleSave}>
            Sign Up
          </button>
          <div className="registration__login">
            Already have an account?
            <Link to={"/login"} className="registration__login-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
