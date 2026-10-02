import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ContentAside } from "./ContentAside.jsx";
import { ContentSection } from "./ContentSection.jsx";
import "../../styles/content/content.css";

export default function Content({ user }) {
  const location = useLocation();
  const isNewPost = location.pathname === "/posts/new";
  const [categories, setCategories] = useState([]);
  const { postId, category } = useParams();

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
