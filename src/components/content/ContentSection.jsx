import { BlogPost } from "./blog/BlogPost.jsx";
import { BlogPostList } from "./blog/BlogPostList.jsx";
import { NewPost } from "./blog/NewPost.jsx";
import "../../styles/content/ContentSection.css";

export function ContentSection({ isNewPost, postId, category, setCategories }) {
  const content = isNewPost ? <NewPost /> : postId ? (
    <BlogPost postId={postId} setCategories={setCategories} />
  ) : (
    <BlogPostList setCategories={setCategories} category={category ?? null} />
  );

  return <section>{content}</section>;
}
