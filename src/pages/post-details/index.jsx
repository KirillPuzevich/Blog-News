import React, { FC, useContext, useEffect, useState } from "react";
import { MyContext } from "../../components/hooks/context.tsx";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "../../components/spinner/index.tsx";
import { postMiddlewareAction } from "../../store/actions/index.ts";
import twitter from "./img/twitter.svg";
import facebook from "./img/facebook.svg";
import dots from "./img/dots.svg";

export const PostDetails = () => {
  const { postId } = useParams();

  const navigate = useNavigate();
  const ctx = useContext(MyContext);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDet.content);

  useEffect(() => {
    dispatch(postMiddlewareAction(postId, navigate));
  }, []);

  if (!post || post.length === 0 || postId != post.id) {
    return <Spinner />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Ссылка скопирована в буфер обмена!");
  };

  return (
    <div className={`details  ${ctx.isBlackTheme ? "details__dark" : ""}`}>
      <div className="container">
        <div className="details__container">
          <Link to={"/blogs"} className="details__container-btn">
            Home
          </Link>
          <p className="details__container-post"> / Post{post.id}</p>
        </div>
        <h1 className="details__title">{post.title}</h1>
        <div className="details__content">
          <img
            className="details__content-img"
            src={post.image_url}
            alt=""
            onError={(e) => (e.target.src = "https://placehold.co/600x400")}
          />
          <p className="details__content-text">{post.summary}</p>
          <div className="details__actions">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                alt="Share on Facebook"
                className="details__icon"
              />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={twitter}
                alt="Share on Twitter"
                className="details__icon"
              />
            </a>
            <img
              src={dots}
              className="details__icon"
              onClick={handleCopyLink}
              alt="Copy link"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
