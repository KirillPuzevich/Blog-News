import { createTechnologyPost } from "../../api/technologyPost";
import { CreatePost } from "../create-post";

export const TechnologyPost = () => (
    <CreatePost 
      nav={'/technology-news'}
      createPost={createTechnologyPost} 
      categoryId={3} 
      onSuccess={(response) => console.log("Sport Post Created:", response)} 
      onError={(error) => console.error("Error:", error)} 
    />
  );