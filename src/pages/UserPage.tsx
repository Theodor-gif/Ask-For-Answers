import Register from "../components/Register.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import LogIn from "../components/LogIn.tsx";
import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";

const Account = () => {
  const { setView, view } = useContext(dataContext);

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {view === false ? (
          <div className="mx-auto w-full max-w-sm px-4 pt-10 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Ask For Answers ID
            </h3>
            <h3 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              REGISTRATION
            </h3>
            <div className="mt-4 text-gray-600">
              <p>Do you already have a Ask For Answers ID ? </p>
              <p>
                Log in
                <span
                  className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                  onClick={() => setView((prev) => !prev)}
                >
                  {" "}
                  here
                </span>
                .
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              <span className="text-red-500">* </span>Required fields
            </p>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-sm px-4 pt-10 text-center">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ask For Answers ID LOGIN
            </h3>
            <div className="mt-4 text-gray-600">
              <p>Don't have a Ask For Answers ID ?</p>
              <p>
                Register{" "}
                <span
                  className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                  onClick={() => setView((prev) => !prev)}
                >
                  here
                </span>
                .
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              <span className="text-red-500">* </span>Required fields
            </p>
          </div>
        )}

        {view === true ? <LogIn /> : <Register />}
      </main>

      <Footer />
    </section>
  );
};

export default Account;
