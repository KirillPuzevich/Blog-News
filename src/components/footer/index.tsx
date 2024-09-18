import React, { useState } from "react";
import "./styles.scss";
import { ModeButton } from "../mode-button";
import { useContext } from "react";
import { MyContext } from "../hooks/context";

export const Footer = () => {
  const ctx = useContext(MyContext);
  return (
    <footer className={`footer ${ctx.isBlackTheme ? "footer__dark" : ""}`}>
      <div className="container">
        <div className="footer__divider"></div>
        <div className="footer__wrapper">
          <span className="footer__wrapper-txt">© 2024 Blog News</span>
          <div className="footer__wrapper-theme">
            <ModeButton />
          </div>
        </div>
      </div>
    </footer>
  );
};
