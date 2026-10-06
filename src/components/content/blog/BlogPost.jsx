import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, SquarePen, Trash } from "lucide-react";

import {
  getAllComments,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../../../api/content.js";
import { CommentSection } from "./CommentSection.jsx";
import "../../../styles/content/blog/blogPost.css";

// A single blog post
export function BlogPost({ postId, setCategories }) {
  // The post data
  const [post, setPost] = useState(null);
  // Used when editing the post
  const [edit, setEdit] = useState(false);
  // The comment data
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  // The published checkbox state
  const [published, setPublished] = useState(false);

  // Set the unique categories from available posts
  useEffect(() => {
    getPosts().then((posts) => {
      const uniqueCategories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
      ];

      setCategories(uniqueCategories);
    });
  }, []);

  // Get the post and comments from the postid and set them both
  useEffect(() => {
    Promise.all([getSinglePost(postId), getAllComments(postId)]).then(
      ([post, comments]) => {
        setPost(post);
        setComments(comments);
      },
    );
  }, [postId]);

  // Set the checkbox data
  useEffect(() => {
    if (post) {
      setPublished(post.published);
    }
  }, [post]);

  // Send the post data to the API function
  async function editPost(event) {
    event.preventDefault();
    // Gather the data
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      // Send data to the API and reset the form
      const updatedPost = await updatePost(
        postId,
        formData.get("postTitle"),
        formData.get("postBody"),
        formData.get("postCategory"),
        formData.get("published") === "on",
      );
      form.reset();
      // Switch to post view and set the new data
      setEdit(false);
      setPost(updatedPost);
    } catch (error) {
      alert(error.message);
    }
  }

  // Remove a post
  async function removePost() {
    // Confirm with the user about the action
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) {
      try {
        // Send the delete request to the api and navigate home
        await deletePost(postId);
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    }
  }

  // If there is no post, show loading
  if (!post) {
    return <div>Loading...</div>;
  }

  // If the user is editing, show the form, otherwise the post body
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
          checked={published}
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
