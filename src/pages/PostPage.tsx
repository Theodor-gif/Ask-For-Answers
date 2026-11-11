import { useContext, useMemo, useState, type FormEvent } from "react";
import { dataContext } from "../context/contextApi.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import SearchIcon from "../assets/Search-Icon.png";
import { Link } from "react-router";

const PostPage = () => {
  const {
    post,
    data,
    comments,
    deletePost,
    deleteAlert,
    setDeleteAlert,
    setIdPost,
  } = useContext(dataContext);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const stored = localStorage.getItem("idUser");
  const id = stored ? Number(stored) : null;

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return post;

    return post.filter((p) => {
      const author = data.find((u) => u.id === p.user_id);
      const authorName = author
        ? `${author.first_name} ${author.last_name}`.toLowerCase()
        : "";

      return (
        p.title.toLowerCase().includes(q) ||
        p.text.toLowerCase().includes(q) ||
        authorName.includes(q)
      );
    });
  }, [post, data, searchTerm]);

  const commentCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    comments.forEach((c) => {
      counts[c.post_id] = (counts[c.post_id] || 0) + 1;
    });
    return counts;
  }, [comments]);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchTerm(searchInput);
  }

  function handleClear() {
    setSearchInput("");
    setSearchTerm("");
  }

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
        <form
          onSubmit={handleSearch}
          className="mx-auto mb-8 flex w-full max-w-xl items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 shadow-sm focus-within:border-indigo-600"
        >
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
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.target.value === "") setSearchTerm("");
            }}
          />
          {searchInput && (
            <button
              className="shrink-0 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800"
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button
            className="shrink-0 rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            type="submit"
          >
            Search
          </button>
        </form>

        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Posts
        </h1>

        {filteredPosts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-center text-gray-500">
            {searchTerm.trim()
              ? `No posts found for "${searchTerm.trim()}".`
              : "No posts yet."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((item) => {
              const count = commentCounts[item.id] ?? 0;
              const isOwner = id !== null && Number(item.user_id) === id;

              return (
                <li key={item.id} className="flex">
                  <div className="flex w-full flex-col rounded-xl border border-zinc-300 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <Link
                      to={`/detailPost/${item.id}`}
                      className="flex flex-1 flex-col p-6"
                    >
                      <h2 className="mb-2 text-xl font-semibold text-zinc-900 wrap-break-word">
                        {item.title}
                      </h2>
                      <p className="flex-1 text-gray-600 wrap-break-word">
                        {item.text}
                      </p>
                      <p className="mt-3 text-sm font-medium text-gray-500">
                        💬 {count} {count === 1 ? "comment" : "comments"}
                      </p>
                    </Link>

                    {isOwner && (
                      <div className="flex justify-end gap-3 px-6 pb-6">
                        <button
                          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                          type="button"
                          onClick={() => {
                            console.log("Edit post", item.id);
                          }}
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
                  </div>
                </li>
              );
            })}
          </ul>
        )}

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
