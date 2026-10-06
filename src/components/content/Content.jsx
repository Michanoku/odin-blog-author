import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ContentAside } from "./ContentAside.jsx";
import { ContentSection } from "./ContentSection.jsx";
import "../../styles/content/content.css";

// The main content page
export default function Content({ user }) {
  // The categories data
  const [categories, setCategories] = useState([]);
  // Optional category and postid
  const { postId, category } = useParams();
  // If the pathname is posts/new, a new post is being created
  const location = useLocation();
  const isNewPost = location.pathname === "/posts/new";

  return (
    <>
      <ContentSection
        isNewPost={isNewPost}
        postId={postId}
        category={category}
        setCategories={setCategories}
      />
      <ContentAside user={user} categories={categories} />
    </>
  );
}
