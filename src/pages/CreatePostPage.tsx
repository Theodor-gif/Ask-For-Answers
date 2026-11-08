import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const AddPost = () => {
  return (
    <section>
      <Navbar />
      <div className="text-center  w-90 m-[30px_auto_20px_auto]">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Create your post
        </h3>
        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
          Ask a question, share an idea, or start a discussion. One post is all
          it takes to get answers from the community.
        </p>
      </div>
      <form className=" w-80 m-[50px_auto_50px_auto]">
        <div className="flex flex-col mb-5">
          <label htmlFor="titlePost">
            Title<span> *</span>
          </label>
          <input
            id="titlePost"
            className="border-b w-50"
            type="text"
            name="titlePost"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="textPost">
            Text<span> *</span>
          </label>
          <textarea
            className="border w-80 p-2.5"
            cols={5}
            rows={10}
            placeholder="Write your post here ..."
          />
        </div>
        <button className="block mx-auto border p-2 w-35 my-10" type="submit">
          Add Post
        </button>
      </form>
      <Footer />
    </section>
  );
};

export default AddPost;
