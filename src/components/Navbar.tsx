import { NavLink } from "react-router";
import userIcon from "../assets/User-White-Icon.png";
import homeIcon from "../assets/home-icon.png";
import postIcon from "../assets/posts-icon.png";
import postPlusIcon from "../assets/postPlus-icon.png";
import askIcon from "../assets/ask-icon.png";

const Navbar = () => {
  return (
    <nav className="bg-zinc-200 flex flex-col items-center h-30 ">
      <div className="h-full flex justify-center items-center">
        <img className="h-full" src={askIcon} alt="askLogo-icon" />
      </div>
      <ul className="flex  h-50 w-full justify-evenly items-center">
        <li>
          <NavLink to="/">
            <span className="hidden sm:inline">Home</span>
            <img
              className="sm:hidden"
              src={homeIcon}
              alt="home-icon"
              width="16"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts">
            <span className="hidden sm:inline">Posts</span>
            <img
              className="sm:hidden"
              src={postIcon}
              alt="post-icon"
              width="16"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/addPost">
            <span className="hidden sm:inline">Create Post</span>
            <img
              className="sm:hidden"
              src={postPlusIcon}
              alt="postPlus-icon"
              width="16"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/create">
            <span className="hidden sm:inline">Account</span>
            <img
              className="sm:hidden"
              src={userIcon}
              alt="user-icon"
              width="16"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
