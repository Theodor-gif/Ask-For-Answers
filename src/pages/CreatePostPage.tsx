import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import React, { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import { useNavigate } from "react-router";

const AddPost = () => {
  const { titleUser, textUser, setTitleUser, setTextUser, AddPost } =
    useContext(dataContext);

  const navigate = useNavigate();

  async function uploadPost(e: React.FormEvent<HTMLFormElement>) {
    const ok = await AddPost(e);
    if (ok) navigate("/posts");
  }

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto mb-8 max-w-xl text-center">
          <h3 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Create your post
          </h3>
          <p className="text-base text-gray-600 md:text-lg">
            Ask a question, share an idea, or start a discussion. One post is
            all it takes to get answers from the community.
          </p>
        </div>

        <form
          className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-6 shadow-sm sm:p-8"
          onSubmit={uploadPost}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="titlePost"
              className="text-sm font-medium text-zinc-700"
            >
              Title<span className="text-red-500"> *</span>
            </label>
            <input
              id="titlePost"
              className="w-full border-b border-zinc-400 bg-transparent py-2 text-base outline-none focus:border-indigo-600"
              type="text"
              name="titlePost"
              value={titleUser}
              onChange={(e) => setTitleUser(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="textPost"
              className="text-sm font-medium text-zinc-700"
            >
              Text<span className="text-red-500"> *</span>
            </label>
            <textarea
              id="textPost"
              className="w-full resize-y rounded-lg border border-zinc-400 p-3 text-base outline-none focus:border-indigo-600"
              rows={10}
              placeholder="Write your post here ..."
              value={textUser}
              onChange={(e) => setTextUser(e.target.value)}
            />
          </div>

          <button
            className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 sm:mx-auto sm:w-auto sm:px-10"
            type="submit"
          >
            Add Post
          </button>
        </form>
      </main>

      <Footer />
    </section>
  );
};

export default AddPost;
