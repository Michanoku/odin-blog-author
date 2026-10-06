import { useNavigate } from "react-router-dom";
import { postPost } from "../../../api/content.js";
import "../../../styles/content/blog/blogPost.css";

// The component to create new posts
export function NewPost() {
  const navigate = useNavigate();
  // Submit the new post to the API
  async function submitPost(event) {
    event.preventDefault();
    // Gather the data
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      // Send the data to the api and reset the form
      await postPost(
        formData.get("postTitle"),
        formData.get("postBody"),
        formData.get("postCategory"),
        formData.get("published") === "on",
      );
      form.reset();
      // Navigate back to home
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="contentColumn">
      <form className="contentWidth" onSubmit={submitPost}>
        <label htmlFor="postTitle">Title</label>
        <input id="postTitle" type="text" name="postTitle" />
        <label htmlFor="postCategory">Category</label>
        <input id="postCategory" type="text" name="postCategory" />
        <label>
          <input type="checkbox" name="published" />
          Publish
        </label>

        <label htmlFor="postBody">Body</label>
        <textarea id="postBody" rows={10} name="postBody" />
        <div className="commentButtons">
          <button
            type="button"
            className="cancelButton"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
