import { createCulturalPost } from "../../api/culturalPost";
import { CreatePost } from "../create-post";


export const CulturalPost = () => (
    <CreatePost
      nav={'/cultural-news'}
      createPost={createCulturalPost} 
      categoryId={2} 
      onSuccess={(response) => console.log("Cultural Post Created:", response)} 
      onError={(error) => console.error("Error:", error)} 
    />
  );