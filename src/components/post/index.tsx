import React, { FC, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MyContext } from "../hooks/context";
import { addImgAction } from "../../store/actions";
import { dateUtils } from "../../utils";
import like from "./img/like.svg";
import likeWhite from "./img/like-white.svg";
import dislike from "./img/dislike (2).svg";
import "./styles.scss";

interface IPostProps {
  post: {
    id: number;
    imageUrl: string;
    publishedAt: string;
    title: string;
    liked: boolean; 
    likesCount: number;
  };
  index: number;
  img: string;
  categoryId: string;
}

export const Post: FC<IPostProps> = ({ post, index, img, categoryId }) => {
  const ctx = useContext(MyContext);
  const isAuth = localStorage.getItem("isAuth");
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likesCount); // Локальное состояние для лайков

  useEffect(() => {
    setIsLiked(post.liked);
    setLikesCount(post.likesCount); // Обновляем локальное состояние при изменении post.likesCount
  }, [post]);

  const handleClickImg = () => {
    dispatch(addImgAction(img));
  };

  const handleLikeClick = async () => {
    const newLikedStatus = !isLiked;
    const response = await fetch(`http://localhost:8080/api/me/likedNews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        categoryId,
        newsId: post.id,
        liked: newLikedStatus,
      }),
    });

    if (response.ok) {
      setIsLiked(newLikedStatus);
      setLikesCount(newLikedStatus ? likesCount + 1 : likesCount - 1); // Обновляем количество лайков локально
    } else {
      console.error("Ошибка при отправке лайка");
    }
  };

  return (
    <div className={`post ${ctx.isBlackTheme ? "post__dark" : ""}`} style={{ gridArea: `post-${index}` }}>
      <div className="post__wrapper">
        <div className="post__img">
          <img
            src={post.imageUrl}
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
            <strong>Опубликовано:</strong> {dateUtils(post.publishedAt)}
          </p>
          
          <Link to={`${post.id}`} className="post__title">
            {post.title}
          </Link>
          <div className="post_like-container">
            <button onClick={handleLikeClick} className={isAuth === "true" ? "post_like-button" : "post_like-button-none"}>
              <img
                src={isLiked ? dislike : ctx.isBlackTheme ? likeWhite : like}
                alt={isLiked ? "Dislike" : "Like"}
                className="post_like-icon"
              />
            </button>
            <span className={isAuth === "true" ? "post_likes-count" : "post_like-count-none"}>
              Количество лайков: {likesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};