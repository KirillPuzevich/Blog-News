import React, { FC, useContext, useEffect } from "react";
import "./styles.scss";
import { MyContext } from "../../components/hooks/context";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoMiddlewareAction, removeFavoriteAction } from "../../store/actions";
import back from "./img/back.svg";
import backWhite from "./img/backWhite.svg";
import { Spinner } from "../../components/spinner";
import { getUser } from "../../store/selectors";

export const UserPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ctx = useContext(MyContext);
  const user = useSelector(getUser);

  const handleRemoveFavorite = async (categoryId: number) => {
    //@ts-expect-error
    const response = await dispatch(removeFavoriteAction(categoryId));
    if (response) {
      //@ts-expect-error
      await dispatch(getUserInfoMiddlewareAction(navigate));
    }
  };

  const isTokenExpired = (token: string | null) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (isTokenExpired(token)) {
      localStorage.clear();
      navigate("/login");
    } else {
      //@ts-expect-error
      dispatch(getUserInfoMiddlewareAction(navigate));
    }
  }, [dispatch, navigate]);

  const handleClickExit = () => {
    localStorage.clear();
    navigate("/");
  };

  const getLinkByCategoryName = (name: string) => {
    switch (name) {
      case "Sport":
        return "/sport-news";
      case "Culture":
        return "/cultural-news";
      case "Technology":
        return "/technology-news";
      case "Entertainment":
        return "/entertainment-news";
      default:
        return "/";
    }
  };

  if (!user.username) {
    return <Spinner />;
  }

  return (
    <div className={`user ${ctx.isBlackTheme ? "user__dark" : ""}`}>
      <div className="container">
        <div className="user__wrapper">
          <Link to={"/"} className="user__btn">
            <img
              className="user__btn-img"
              src={ctx.isBlackTheme ? backWhite : back}
              alt="back"
            />
          </Link>
          <h1 className="user__title">Profile</h1>
          <div className="user__content">
            <p className="user__content-text">
              Name: <strong className="user__content-strong">{user.username}</strong>
            </p>
            <p className="user__content-text">
              Email: <strong className="user__content-strong">{user.email}</strong>
            </p>
            <p className="user__content-text">
              Id: <strong className="user__content-strong">{user.id}</strong>
            </p>
          </div>

          <div className="user__favorites">
            <h3 className="user__favorites__title">Favorites:</h3>
            {user.favorites.length > 0 ? (
              <ul className="user__favorites__list">
                {user.favorites.map((favorite: { id: number; name: string }) => (
                  <li key={favorite.id} className="user__favorites__list-item">
                    <Link to={getLinkByCategoryName(favorite.name)} className="user__favorites__list-item-link">
                      {favorite.name}
                    </Link>
                    <button 
                      className="user__favorites__list-item-button" 
                      onClick={() => handleRemoveFavorite(favorite.id)}>
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="user__favorites__empty">У вас нет избранных категорий.</p>
            )}
          </div>

          <button className="user__exit" onClick={handleClickExit}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};