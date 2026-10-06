import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getPosts } from "../../../api/content.js";
import "../../../styles/content/blog/blogPostList.css";

// A single blog post link
function BlogPostLink({ post }) {
  // Helper function to truncate blog body text to display in the list
  function truncateText(text, maxLength) {
    // If the text is already shorter, just return
    if (text.length <= maxLength) return text;

    // Else, slice and trim, don't cut off any words but add ...
    return (
      text
        .slice(0, maxLength)
        .trimEnd()
        .replace(/\s+\S*$/, "") + "…"
    );
  }

  return (
    <div className="contentWidth contentSpacing">
      <div>
        <span className="contentMeta">
          {post.category} /{" "}
          {post.publishedAt
            ? new Date(post.publishedAt)
                .toISOString()
                .slice(0, 16)
                .replace("T", " ")
            : "Unpublished"}
        </span>
      </div>
      <h3 className="contentHeader blogPostListCenter">
        {post.title}{" "}
        <span
          className={`statusDot ${post.published ? "published" : "unpublished"}`}
        />
      </h3>

      <div>{truncateText(post.body, 150)}</div>
      <Link className="blogPostLink contentSpacing" to={`/posts/${post.id}`}>
        Open post
      </Link>
    </div>
  );
}

// The list of blog articles
export function BlogPostList({ setCategories, category }) {
  // ALL posts
  const [allPosts, setAllPosts] = useState([]);
  // Displayed posts
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // GEt all posts and set the categories
  useEffect(() => {
    getPosts().then((posts) => {
      setAllPosts(posts);
      setPosts(posts);

      // Set unique categories
      const uniqueCategories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
      ];

      setCategories(uniqueCategories);
    });
  }, []);

  // If a category was provided, filter the posts accordingly, else set all
  useEffect(() => {
    const newPosts = category
      ? allPosts.filter((post) => post.category === category)
      : allPosts;

    setPosts(newPosts);
  }, [category, allPosts]);

  // If we are looking at a category, provide a back button to get back to all
  const back = category ? (
    <Link className="navLink" to="/">
      <ArrowLeft />
    </Link>
  ) : null;

  return (
    <div className="contentColumn">
      <div className="contentWidth">
        <div className="blogPostListCenter">
          {back}
          <button className="newButton" onClick={() => navigate("/posts/new")}>
            New post
          </button>
        </div>
      </div>
      <h2 className="blogPostListTitle">{category ?? "Recent"} posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => <BlogPostLink key={post.id} post={post} />)
      ) : (
        <div className="contentWidth contentSpacing">
          <p className="contentHeader">No posts yet.</p>
        </div>
      )}
    </div>
  );
}
