import { User } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/content/contentAside.css";

export function ContentAside({ user, categories }) {
  return (
    <aside>
      <div className="asideTitle">User</div>
      <div className="userInfo">
        <User />
        <span>{user.username}</span>
      </div>
      <div className="asideTitle">Categories</div>
      <div className="asideCategories">
        {categories.map((category) => (
          <Link className="navLink" to={`/category/${category}`} key={category}>
            {category}
          </Link>
        ))}
      </div>
    </aside>
  );
}
