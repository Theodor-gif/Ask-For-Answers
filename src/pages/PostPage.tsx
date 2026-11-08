import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const PostPage = () => {
  const { post } = useContext(dataContext);

  const id = Number(localStorage.getItem("idUser"));

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Posts
        </h1>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {post.map((item) => (
            <li
              key={item.id}
              className="flex flex-col rounded-xl border border-zinc-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold text-zinc-900 wrap-break-word">
                {item.title}
              </h2>
              <p className="mb-4 flex-1 text-gray-600 wrap-break-word">
                {item.text}
              </p>
              {id !== null && Number(item.user_id) === id && (
                <button
                  className="self-end rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  type="button"
                >
                  delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </section>
  );
};
export default PostPage;
