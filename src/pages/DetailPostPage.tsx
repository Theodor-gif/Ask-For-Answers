import { useParams, Link } from "react-router";
import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const DetailPost = () => {
  const { id } = useParams();
  const { data, post, comments } = useContext(dataContext);

  const postUser = post.find((p) => String(p.id) === id);

  // must come BEFORE using postUser
  if (!postUser) {
    return (
      <section className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-10 text-center">
          <p className="text-lg text-gray-600">Loading or post not found.</p>
          <Link
            to="/posts"
            className="rounded-lg border border-zinc-300 px-5 py-2 font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            Back to posts
          </Link>
        </main>
        <Footer />
      </section>
    );
  }

  const author = data.find((u) => u.id === postUser.user_id);
  const commentsPost = comments.filter((p) => String(p.post_id) === id);

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <Link
          to="/posts"
          className="mb-6 inline-block text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
        >
          &larr; Back to posts
        </Link>

        <article className="rounded-xl border border-zinc-300 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 wrap-break-word md:text-4xl">
            {postUser.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-zinc-200 pb-4 text-sm text-gray-500">
            {author && (
              <p>
                By{" "}
                <span className="font-medium text-zinc-700">
                  {author.first_name} {author.last_name}
                </span>
              </p>
            )}
            <small>{new Date(postUser.created_at).toLocaleDateString()}</small>
          </div>

          <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700 wrap-break-word md:text-lg">
            {postUser.text}
          </p>
        </article>

        {/* Create Comment */}
        <form className="mt-10 flex flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
            Add a comment
          </h2>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="commentTitle"
              className="text-sm font-medium text-zinc-700"
            >
              Title<span className="text-red-500"> *</span>
            </label>
            <input
              className="w-full border-b border-zinc-400 bg-transparent py-2 text-base outline-none focus:border-indigo-600"
              id="commentTitle"
              type="text"
              name="commentTitle"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="commentText"
              className="text-sm font-medium text-zinc-700"
            >
              Text<span className="text-red-500"> *</span>
            </label>
            <textarea
              className="w-full resize-y rounded-lg border border-zinc-400 p-3 text-base outline-none focus:border-indigo-600"
              id="commentText"
              rows={5}
              placeholder="Write your comment here ..."
            ></textarea>
          </div>

          <button
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 sm:ml-auto sm:w-auto sm:px-8"
            type="button"
          >
            Add comment
          </button>
        </form>

        {/* Comments */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
            Comments{" "}
            <span className="text-base font-medium text-gray-500">
              ({commentsPost.length})
            </span>
          </h2>

          {commentsPost.length === 0 ? (
            <p className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-center text-gray-500">
              No comments yet. Be the first to answer!
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {commentsPost.map((item) => {
                const commenter = data.find((u) => u.id === item.user_id);
                return (
                  <li
                    key={item.id}
                    className="rounded-xl border border-zinc-300 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                      <span className="font-medium text-zinc-700">
                        {commenter
                          ? `${commenter.first_name} ${commenter.last_name}`
                          : "Anonymous"}
                      </span>
                      <small>
                        {new Date(item.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    <p className="whitespace-pre-wrap text-gray-700 wrap-break-word">
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default DetailPost;
