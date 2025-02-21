import React, { useContext, useEffect } from "react";
import { MyContext } from "../../components/hooks/context";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { postMiddlewareAction, deletePostAction } from "../../store/actions/";
import PostDetailsComponent from "../postDetailsComponent/index";
import { urlApi } from "../../serviceWorkerRegistration";

export const PostDetailsTechnology = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(MyContext);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDet.content);
  const isLoading = !post || post.length === 0;

  useEffect(() => {
    const url = `${urlApi}api/technology-news`;
    dispatch(postMiddlewareAction(postId, navigate, url));
  }, [postId, navigate, dispatch]);

  const handleDeletePost = async () => {
    const url = `${urlApi}api/technology-news`;
    const nav = '/technology-news';
    try {
      await dispatch(deletePostAction(postId, navigate, url, nav));
      navigate(nav); 
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  };

  return (
    <PostDetailsComponent 
      post={post} 
      onDelete={handleDeletePost} 
      isLoading={isLoading} 
      nav="/technology-news" 
    />
  );
};