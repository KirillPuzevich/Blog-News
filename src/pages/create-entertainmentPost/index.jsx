import { createEntertainmentPost } from "../../api/entertainmentPost";
import { CreatePost } from "../create-post";


export const EntertainmentPost = () => (
    <CreatePost
      nav={'/entertainment-news'}
      createPost={createEntertainmentPost} 
      categoryId={4} 
      onSuccess={(response) => console.log("Cultural Post Created:", response)} 
      onError={(error) => console.error("Error:", error)} 
    />
  );