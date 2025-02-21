import React, { FC, useContext, useEffect } from "react";
import { MyContext } from "../../components/hooks/context";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { postMiddlewareAction, deletePostAction } from "../../store/actions/";
import PostDetailsComponent from "../postDetailsComponent/index"; // Импортируйте общий компонент
import { urlApi } from "../../serviceWorkerRegistration";

export const PostDetailsEntertainment = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(MyContext);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDet.content);
  const isLoading = !post || post.length === 0;

  useEffect(() => {
    const url = `${urlApi}api/entertainment-news`;
    dispatch(postMiddlewareAction(postId, navigate, url));
  }, [postId, navigate, dispatch]);

  const handleDeletePost = () => {
    const url = `${urlApi}api/entertainment-news`;
    const nav = '/entertainment-news'
    dispatch(deletePostAction(postId, navigate, url, nav));
  };

  return (
    <PostDetailsComponent post={post} onDelete={handleDeletePost} isLoading={isLoading} nav="/entertainment-news"  />
  );
};
