import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import { Link } from "react-router";
import Navbar from "../components/Navbar.tsx";

const HomePage = () => {
  const { data, post } = useContext(dataContext);
  return (
    <section>
      <Navbar />

      <h1 className="text-4xl">Hello</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>First name {item.first_name}</h2>
          <p>age {item.age}</p>
        </div>
      ))}
      {post.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
};

export default HomePage;
