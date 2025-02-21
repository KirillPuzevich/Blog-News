import React from "react";
import { Blog } from "../../components/blog";
import { urlApi } from "../../serviceWorkerRegistration";

export const EntertainmentBlog = () => {
  const url = `${urlApi}api/entertainment-news`
  return <Blog apiUrl={url} createPostPath="/create-entertainmentPost" categoryId = "4" />;
};