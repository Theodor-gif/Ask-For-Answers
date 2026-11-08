import { NavLink } from "react-router";
import userIcon from "../assets/User-White-Icon.png";
import homeIcon from "../assets/home-icon.png";
import postIcon from "../assets/posts-icon.png";
import postPlusIcon from "../assets/postPlus-icon.png";
import askIcon from "../assets/ask-icon.png";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-zinc-300 text-zinc-900"
      : "text-zinc-600 hover:bg-zinc-300/60 hover:text-zinc-900"
  }`;

const Navbar = () => {
  return (
    <nav className="bg-zinc-200 shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20">
        <div className="flex h-full items-center py-2">
          <img className="h-full w-auto" src={askIcon} alt="askLogo-icon" />
        </div>

        <ul className="flex items-center gap-1 sm:gap-4">
          <li>
            <NavLink to="/" className={linkClass}>
              <span className="hidden sm:inline">Home</span>
              <img
                className="sm:hidden"
                src={homeIcon}
                alt="home-icon"
                width="20"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts" className={linkClass}>
              <span className="hidden sm:inline">Posts</span>
              <img
                className="sm:hidden"
                src={postIcon}
                alt="post-icon"
                width="20"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/addPost" className={linkClass}>
              <span className="hidden sm:inline">Create Post</span>
              <img
                className="sm:hidden"
                src={postPlusIcon}
                alt="postPlus-icon"
                width="20"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className={linkClass}>
              <span className="hidden sm:inline">Account</span>
              <img
                className="sm:hidden"
                src={userIcon}
                alt="user-icon"
                width="20"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
