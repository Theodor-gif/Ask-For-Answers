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
    <section>
      <Navbar />
      <section className="text-center px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Ask. Share. Discuss.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Ask For Answers is a place where people post questions, share ideas,
          and help each other through comments. One post is all it takes to
          start a conversation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/create"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Create a post
          </Link>
          <Link
            to="/posts"
            className="border px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
          >
            Browse posts
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          How it works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.id} className="border rounded-xl p-6 text-center">
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default HomePage;
