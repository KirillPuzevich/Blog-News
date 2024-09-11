import React, {FC} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_THEME_ACTION } from "../../store/actions";
import  "./styles.scss";
import {getBlackTheme} from "../../store/selectors"

export const ModeButton: FC = () => {
  const dispatch = useDispatch();
  const isBlackTheme = useSelector(getBlackTheme);

  const toggleTheme = () => {
    dispatch(CHANGE_THEME_ACTION);
  };

  return (
    <button
      className={isBlackTheme ? "dark__btn" : "light__btn"}
      onClick={toggleTheme}
    >
      {isBlackTheme ? "Light theme" : "Dark theme"}
    </button>
  );
};
