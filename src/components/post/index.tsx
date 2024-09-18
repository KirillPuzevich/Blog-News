import React, { FC } from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../hooks/context";
import { useDispatch } from "react-redux";
import { dateUtils } from "../../utils/dateUtils";
import logo from "../header/img/logo.svg";
import { addImgAction } from "../../store/actions";
import "./styles.scss";

interface IPostProps {
  post: {
    id: number;
    image_url: string;
    published_at: string;
    title: string;
    news_site: string;
    url: string;
  };
  index: number;
  img: string;
}

export const Post: FC<IPostProps> = ({ post, index, img }) => {
  const ctx = useContext(MyContext);

  const dispatch = useDispatch();

  const handleClickImg = () => {
    dispatch(addImgAction(img));
  };

  return (
    <div
      className={`post ${ctx.isBlackTheme ? "post__dark" : ""}`}
      style={{ gridArea: `post-${index}` }}
    >
      <div className="post__wrapper">
        <div className={`post__img `}>
          <img
            src={post.image_url}
            alt=""
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400";
            }}
            onClick={handleClickImg}
          />
        </div>
        <div className="post__info">
          <p className="post__date">
            <strong>Published:</strong> {dateUtils(post.published_at)}
          </p>
          <p className="post__text">
            <strong>News site:</strong>
            <Link className="post__text-url" to={post.url} target="_blank">
              {post.news_site}
            </Link>
          </p>
          <Link to={`${post.id}`} className="post__title">
            {post.title}
          </Link>
        </div>
      </div>
    </div>
  );
};
