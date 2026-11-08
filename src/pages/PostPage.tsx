import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const PostPage = () => {
  const { post } = useContext(dataContext);
  return (
    <section>
      <Navbar />
      <section className="h-110 border">
        <ul>
          {post.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </section>
  );
};

export default PostPage;
