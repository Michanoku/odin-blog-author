import { useState } from "react";
import { SquarePen, Trash } from "lucide-react";

import {
  postComment,
  updateComment,
  deleteComment,
} from "../../../api/content.js";
import "../../../styles/content/blog/CommentSection.css";

// A single comment
function Comment({ comment, editComment, removeComment }) {
  // Used then comment is edited
  const [edit, setEdit] = useState(false);

  // If the user is editing, show the form, otherwise the comment body
  const body = edit ? (
    <form
      className="contentWidth"
      onSubmit={(event) => {
        editComment(event);
        setEdit(false);
      }}
    >
      <input type="hidden" name="commentId" value={comment.id} />
      <textarea
        name="commentBody"
        maxLength={1000}
        rows={6}
        defaultValue={comment.body}
      />
      <div className="commentButtons">
        <button
          type="button"
          className="cancelButton"
          onClick={() => setEdit(false)}
        >
          Cancel
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  ) : (
    <>
      <div>{comment.body}</div>
      <div className="commentButtons">
        <button className="icon" onClick={() => setEdit(true)}>
          <SquarePen />
        </button>
        <button className="icon" onClick={() => removeComment(comment.id)}>
          <Trash />
        </button>
      </div>
    </>
  );

  return (
    <div className="contentSpacing" key={comment.id}>
      <div className="contentMeta">
        {comment.user.username}{" "}
        <span className="contentMeta">
          -{" "}
          {new Date(comment.createdAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}
        </span>
      </div>
      {body}
    </div>
  );
}

// The comment section showing all comments for the post
export function CommentSection({ comments, setComments, postId }) {
  // Submit a new comment
  async function submitComment(event) {
    event.preventDefault();
    // Gather the data
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      // Send the data to the API and get the new comment back
      const newComment = await postComment(postId, formData.get("commentBody"));
      // Add the new comment to the comment list and reset the form
      setComments((comments) => [newComment, ...comments]);
      form.reset();
    } catch (error) {
      alert(error.message);
    }
  }

  // Editing a comment
  async function editComment(event) {
    event.preventDefault();
    // Gather the data
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      // Send the data to the API and get the updated comment back
      const updatedComment = await updateComment(
        postId,
        formData.get("commentId"),
        formData.get("commentBody"),
      );
      // Replace the original comment with the updated one, then reset the form
      setComments((comments) =>
        comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      );
      form.reset();
    } catch (error) {
      alert(error.message);
    }
  }

  // Remove a comment
  async function removeComment(commentId) {
    // Confirm the users intent
    const confirmation = confirm(
      "Are you sure you want to delete this comment?",
    );
    if (confirmation) {
      try {
        // Send the request to the API
        await deleteComment(postId, commentId);
        // Remove the comment from the list
        setComments((comments) =>
          comments.filter((comment) => comment.id !== commentId),
        );
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <>
      <div className="contentWidth">
        <h3 className="contentHeader">Comments</h3>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment.id}
            editComment={editComment}
            removeComment={removeComment}
          />
        ))}
      </div>
      <form className="contentWidth" onSubmit={submitComment}>
        <h3 className="contentHeader">Join the discussion</h3>
        <textarea name="commentBody" placeholder="" maxLength={1000} rows={6} />
        <button type="submit">Post comment</button>
      </form>
    </>
  );
}
