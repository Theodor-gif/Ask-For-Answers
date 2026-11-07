import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav>
      <h2>Ask For Answers</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/create">Create user</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
