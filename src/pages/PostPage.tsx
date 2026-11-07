import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import Navbar from "../components/Navbar.tsx";

const PostPage = () => {
  const { post } = useContext(dataContext);
  return (
    <section>
      <Navbar />
      {post.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
};

export default PostPage;
