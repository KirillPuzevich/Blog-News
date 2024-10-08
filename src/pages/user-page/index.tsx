import React, {FC, useContext, useEffect } from "react";
import  "./styles.scss";
import { MyContext } from "../../components/hooks/context";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoMiddlewareAction } from "../../store/actions";
import back from "./img/back.svg";
import backWhite from "./img/backWhite.svg";
import { Spinner } from "../../components/spinner";
import { NotFound } from "../not-found";
import { getUser } from "../../store/selectors";


export const UserPage: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const ctx = useContext(MyContext);

  const user = useSelector(getUser);

  useEffect(() => {
    //@ts-expect-error
    dispatch(getUserInfoMiddlewareAction(navigate));
  }, []);

  const handleClickExit = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user.username) {
    return <NotFound/>;
  }

  return (
    <div className={`user ${ctx.isBlackTheme ? "user__dark" : ""}`}>
      <div className="container">
        <div className="user__wrapper">
          <Link to={"/blogs"} className="user__btn">
            <img
              className="user__btn-img"
              src={ctx.isBlackTheme ? backWhite : back}
              alt="back"
            />
          </Link>
          <h1 className="user__title">Profile</h1>
          <div className="user__content">
            <p className="user__content-text">
              Name:{" "}
              <strong className="user__content-strong">{user.username}</strong>
            </p>
            <p className="user__content-text">
              Email:{" "}
              <strong className="user__content-strong">{user.email}</strong>
            </p>
            <p className="user__content-text">
              Id: <strong className="user__content-strong">{user.id}</strong>
            </p>
          </div>
          <button className="user__exit" onClick={handleClickExit}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
