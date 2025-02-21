import React from "react";
import { Blog } from "../../components/blog";
import { urlApi } from "../../serviceWorkerRegistration";

export const CulturalBlog = () => {
  const url = `${urlApi}api/cultural-news`
  return <Blog apiUrl={url} createPostPath="/create-culturalPost" categoryId = "2" />;
};