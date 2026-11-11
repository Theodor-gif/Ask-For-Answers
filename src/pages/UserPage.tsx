import Register from "../components/Register.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import LogIn from "../components/LogIn.tsx";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../context/contextApi.tsx";

const Account = () => {
  const { setView, view, idUser, setIdUser } = useContext(dataContext);

  // localStorage is not reactive, so keep the login state in React state
  const [loggedIn, setLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem("token"),
  );

  // When the LogIn component logs the user in, idUser changes in the context
  useEffect(() => {
    if (idUser) setLoggedIn(true);
  }, [idUser]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    setIdUser("");
    setView(false);
    setLoggedIn(false);
  }

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {loggedIn ? (
          <div className="mx-auto w-full max-w-sm px-4 pt-10 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Ask For Answers ID
            </h3>
            <h3 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              You are logged in
            </h3>
            <p className="mt-4 text-gray-600">
              Do you want to leave your account?
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Log out
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>

      <Footer />
    </section>
  );
};

export default Account;
