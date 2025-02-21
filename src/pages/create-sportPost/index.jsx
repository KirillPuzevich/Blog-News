
import { createSportPost } from "../../api/sportPost";
import { CreatePost } from "../create-post";

export const SportPost = () => (
    <CreatePost 
      nav={'/sport-news'}
      createPost={createSportPost} 
      categoryId={1} 
      onSuccess={(response) => console.log("Sport Post Created:", response)} 
      onError={(error) => console.error("Error:", error)} 
    />
  );