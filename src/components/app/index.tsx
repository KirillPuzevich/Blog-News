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
import { SportBlog } from "../../pages/sportBlog";
import { Login } from "../../pages/login";
import { Registration } from "../../pages/registration";
import { Footer } from "../footer";
import { NotFound } from "../../pages/not-found";
import { ActivationEmailPage } from "../../pages/activation-email";
import { UserPage } from "../../pages/user-page";
import { RegistrationDone } from "../../pages/registrationDone";
import { PostDetailsSport } from "../../pages/post-detailsSport";
import { CulturalBlog } from "../../pages/culturalBlog";
import { EntertainmentBlog } from "../../pages/entertainmentBlog";
import { TechnologyBlog } from "../../pages/technologyBlog";
import { PostDetailsCultural } from "../../pages/post-detailsCulture";
import { PostDetailsTechnology } from "../../pages/post-detailsTechnology";
import { PostDetailsEntertainment } from "../../pages/post-detailsEntertainment";
import { CulturalPost } from "../../pages/create-culturalPost";
import { SportPost } from "../../pages/create-sportPost";
import { TechnologyPost } from "../../pages/create-technologyPost";
import { EntertainmentPost } from "../../pages/create-entertainmentPost";
import { MainPage } from "../../pages/mainPage"

const AppContent: FC = () => {
  const isBlackTheme = useSelector(getBlackTheme);
  const location = useLocation();

  const hiddenHeaderPaths = [
    "/login",
    "/registration",
    "/userPage",
    "/create-culturalPost",
    "/create-sportPost",
    "/registrDone",
    "/create-technologyPost",
    "/create-entertainmentPost",
    "/404"
  ];
  
  const showHeader = !hiddenHeaderPaths.includes(location.pathname);

  return (
    <MyContext.Provider value={{ isBlackTheme }}>
      {showHeader && <Header />}
      <main className={isBlackTheme ? "black-theme" : "white-theme"}>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/sport-news" element={<SportBlog/>} />
          <Route path="/cultural-news" element={<CulturalBlog/>} />
          <Route path="/create-culturalPost" element={<CulturalPost/>} />
          <Route path="/create-sportPost" element={<SportPost/>} />
          <Route path="/create-technologyPost" element={<TechnologyPost/>} />
          <Route path="/create-entertainmentPost" element={<EntertainmentPost/>} />
          <Route path="/entertainment-news" element={<EntertainmentBlog/>} />
          <Route path="/technology-news" element={<TechnologyBlog/>} />
          <Route path="login" element={<Login />} />
          <Route path="/sport-news/:postId" element={<PostDetailsSport />} />
          <Route path="/cultural-news/:postId" element={<PostDetailsCultural />} />
          <Route path="/technology-news/:postId" element={<PostDetailsTechnology />} />
          <Route path="/entertainment-news/:postId" element={<PostDetailsEntertainment />} />
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
