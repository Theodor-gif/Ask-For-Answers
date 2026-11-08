import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { Link } from "react-router";

type Step = {
  id: string;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    id: "1",
    title: "Post",
    text: "Write your question or topic and share it with the community.",
  },
  {
    id: "2",
    title: "Discuss",
    text: "People comment with answers, ideas, and different points of view.",
  },
  {
    id: "3",
    title: "Learn",
    text: "Find the answer you were looking for, or keep the conversation going.",
  },
];

const HomePage = () => {
  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Ask. Share. Discuss.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
            Ask For Answers is a place where people post questions, share ideas,
            and help each other through comments. One post is all it takes to
            start a conversation.
          </p>
          <div className="mx-auto flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              to="/addPost"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Create a post
            </Link>
            <Link
              to="/posts"
              className="rounded-lg border border-zinc-300 px-6 py-3 text-center font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              Browse posts
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-5xl px-4 pb-16 md:pb-24">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">
            How it works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="rounded-xl border border-zinc-300 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                  {step.id}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-zinc-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default HomePage;
