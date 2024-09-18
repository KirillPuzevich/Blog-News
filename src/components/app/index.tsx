import React, { FC } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.scss";
import { getBlackTheme } from "../../store/selectors";
import { MyContext } from "../hooks/context";
import { Header } from "../header";
import { BlogPage } from "../../pages/blog";
import { Login } from "../../pages/login";
import { Registration } from "../../pages/registration";
import { Footer } from "../footer";
import { NotFound } from "../../pages/not-found";
import { ActivationEmailPage } from "../../pages/activation-email";
import { UserPage } from "../../pages/user-page";
import { RegistrationDone } from "../../pages/registrationDone";
import { PostDetails } from "../../pages/post-details";

const AppContent: FC = () => {
  const isBlackTheme = useSelector(getBlackTheme);
  const location = useLocation();

  return (
    <MyContext.Provider value={{ isBlackTheme }}>
      {location.pathname !== "/login" &&
        location.pathname !== "/registration" &&
        location.pathname !== "/userPage" &&
        location.pathname !== "/registrDone" &&
        location.pathname !== "/404" && <Header />}
      <main className={isBlackTheme ? "black-theme" : "white-theme"}>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="login" element={<Login />} />
          <Route path="/blogs/:postId" element={<PostDetails />} />
          <Route path="registration" element={<Registration />} />
          <Route
            path="/activate/:uid/:token"
            element={<ActivationEmailPage />}
          />
          <Route path="userPage" element={<UserPage />} />
          <Route path="registrDone" element={<RegistrationDone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </MyContext.Provider>
  );
};

export const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);
