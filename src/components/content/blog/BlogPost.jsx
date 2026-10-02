import { ArrowLeft, SquarePen, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getAllComments,
} from "../../../api/content.js";
import { CommentSection } from "./CommentSection.jsx";
import "../../../styles/content/blog/blogPost.css";

export function BlogPost({ postId, setCategories }) {
  const [post, setPost] = useState(null);
  const [edit, setEdit] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((posts) => {
      const uniqueCategories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
      ];

      setCategories(uniqueCategories);
    });
  }, []);

  useEffect(() => {
    Promise.all([getSinglePost(postId), getAllComments(postId)]).then(
      ([post, comments]) => {
        setPost(post);
        setComments(comments);
      },
    );
  }, [postId]);

  async function editPost(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const updatedPost = await updatePost(
        postId,
        formData.get("postTitle"),
        formData.get("postBody"),
        formData.get("postCategory"),
        formData.get("published") === "on",
      );
      form.reset();
      setEdit(false);
      setPost(updatedPost);
    } catch (error) {
      alert(error.message);
    }
  }

  async function removePost() {
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) {
      try {
        await deletePost(postId);
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    }
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const body = edit ? (
    <form className="contentWidth editForm" onSubmit={editPost}>
      <label htmlFor="postTitle">Title</label>
      <input
        id="postTitle"
        type="text"
        name="postTitle"
        defaultValue={post.title}
      />
      <label htmlFor="postCategory">Category</label>
      <input
        id="postCategory"
        type="text"
        name="postCategory"
        defaultValue={post.category}
      />
      <label>
        <input
          type="checkbox"
          name="published"
          checked={post.published}
          onChange={(event) => setPublished(event.target.checked)}
        />
        Publish
      </label>

      <label htmlFor="postBody">Body</label>
      <textarea
        id="postBody"
        rows={10}
        name="postBody"
        defaultValue={post.body}
      />
      <div className="commentButtons">
        <button
          type="button"
          className="cancelButton"
          onClick={() => setEdit(false)}
        >
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  ) : (
    <div className="contentWidth">
      <div className="blogPostButtons">
        <Link className="navLink back" to="/">
          <ArrowLeft />
        </Link>
        <div className="commentButtons">
          <button className="icon" onClick={() => setEdit(true)}>
            <SquarePen />
          </button>
          <button className="icon" onClick={() => removePost(postId)}>
            <Trash />
          </button>
        </div>
      </div>
      <h2 className="contentHeader">{post.title}</h2>
      <div className="contentMeta">
        {new Date(post.publishedAt)
          .toISOString()
          .slice(0, 16)
          .replace("T", " ")}
      </div>
      <div className="blogCategories">
        <div className="blogCategory">{post.category}</div>
      </div>
      <div className="blogBody">{post.body}</div>
    </div>
  );

  return (
    <>
      <div className="contentColumn">
        {body}
        <hr />
        <CommentSection
          comments={comments}
          setComments={setComments}
          postId={postId}
        />
      </div>
    </>
  );
}
