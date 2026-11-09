import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import SearchIcon from "../assets/Search-Icon.png";
import { Link } from "react-router";

const PostPage = () => {
  const { post, deletePost, deleteAlert, setDeleteAlert, setIdPost } =
    useContext(dataContext);

  const stored = localStorage.getItem("idUser");
  const id = stored ? Number(stored) : null;

  function handleId(postId: string): void {
    setIdPost(postId);
    setDeleteAlert(true);
  }

  async function handleDelete() {
    const ok = await deletePost();
    if (ok) setDeleteAlert(false);
  }

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <form className="mx-auto mb-8 flex w-full max-w-xl items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 shadow-sm focus-within:border-indigo-600">
          <img
            className="h-5 w-5 shrink-0"
            src={SearchIcon}
            alt="search-icon"
          />
          <label htmlFor="search" className="sr-only">
            Search posts
          </label>
          <input
            id="search"
            className="w-full min-w-0 bg-transparent py-1.5 text-base outline-none"
            type="text"
            name="search"
            placeholder="Search posts..."
          />
          <button
            className="shrink-0 rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            type="button"
          >
            Search
          </button>
        </form>

        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Posts
        </h1>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {post.map((item) => (
            <Link key={item.id} to={`/detailPost/${item.id}`}>
              <li className="flex flex-col rounded-xl border border-zinc-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <h2 className="mb-2 text-xl font-semibold text-zinc-900 wrap-break-word">
                  {item.title}
                </h2>
                <p className="mb-4 flex-1 text-gray-600 wrap-break-word">
                  {item.text}
                </p>
                {id !== null && Number(item.user_id) === id && (
                  <div className="flex justify-end gap-3">
                    <button
                      className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      type="button"
                      onClick={() => handleId(String(item.id))}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            </Link>
          ))}
        </ul>

        {deleteAlert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => setDeleteAlert(false)}
          >
            <div
              role="alertdialog"
              aria-labelledby="delete-title"
              className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                id="delete-title"
                className="mb-2 text-xl font-bold text-zinc-900"
              >
                Alert
              </h2>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete it?
              </p>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                <button
                  className="rounded-lg border border-zinc-300 px-5 py-2 font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                  type="button"
                  onClick={() => setDeleteAlert(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                  type="button"
                  onClick={handleDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </section>
  );
};
export default PostPage;
