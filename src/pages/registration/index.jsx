import { useState, useContext } from "react";
import { MyContext } from "../../components/hooks/context.tsx";
import styles from "./styles.scss";
import home from "./img/home.svg";
import homeWhite from "./img/homeWhite.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUpMiddlewareAction } from "../../store/actions/index.ts";

export const Registration = () => {
  const ctx = useContext(MyContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
    group: "",
  });

  const user = useSelector((state) => state.user);

  console.log(user);

  const handleChangeName = (event) => {
    setValues((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const dispatch = useDispatch();

  const handleChangeEmail = (event) => {
    setValues((prevState) => ({ ...prevState, email: event.target.value }));
  };

  const handleChangePass = (event) => {
    setValues((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const handleChangeGroup = (event) => {
    setValues((prevState) => ({ ...prevState, group: event.target.value }));
  };

  const handleSave = () => {
    dispatch(signUpMiddlewareAction(values, navigate));
  };

  return (
    <div
      className={`registration  ${
        ctx.isBlackTheme ? "registration__dark" : ""
      }`}
    >
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
          <label className="registration__label" htmlFor="registrationName">
            Name
          </label>
          <input
            type="text"
            className="registration__input"
            id="registrationName"
            placeholder="Your name"
            value={values.name}
            onChange={handleChangeName}
          />
          {user.errors.username && (
            <p className="registration__error">
              {user.errors.username.join(", ")}
            </p>
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
          {user.errors.email && (
            <p className="registration__error">
              {user.errors.email.join(", ")}
            </p>
          )}
          <label className="registration__label" htmlFor="registrationPass">
            Password
          </label>
          <input
            type="text"
            className="registration__input"
            id="registrationPass"
            placeholder="Password"
            value={values.password}
            onChange={handleChangePass}
          />
          {user.errors.password && (
            <p className="registration__error">
              {user.errors.password.join(", ")}
            </p>
          )}

          <label className="registration__label" htmlFor="registrationGroup">
            Group
          </label>
          <input
            type="number"
            className="registration__input"
            id="registrationGroup"
            placeholder="Group number"
            value={values.group}
            onChange={handleChangeGroup}
          />
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
