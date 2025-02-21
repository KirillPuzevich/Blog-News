import React from "react";
import { Blog } from "../../components/blog";
import { urlApi } from "../../serviceWorkerRegistration";

export const SportBlog = () => {
  const url = `${urlApi}api/sport-news`
  return <Blog apiUrl={url} createPostPath="/create-sportPost" categoryId = "1" />;
};