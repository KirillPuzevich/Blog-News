import React from "react";
import { Blog } from "../../components/blog";
import { urlApi } from "../../serviceWorkerRegistration";

export const TechnologyBlog = () => {
  const url = `${urlApi}api/technology-news`
  return <Blog apiUrl={url} createPostPath="/create-technologyPost" categoryId = "3" />;
};