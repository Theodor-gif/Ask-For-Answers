import correctIcon from "../assets/correct-icon.png";
import wrongIcon from "../assets/wrong-icon.png";
import passwordSeeIcon from "../assets/see-icon.png";
import passwordNotSeeIcon from "../assets/notSee-icon.png";
import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import { useNavigate } from "react-router";

const LogIn = () => {
  const { emailLog, passwordLog, setEmailLog, setPasswordLog, logInUser } =
    useContext(dataContext);

  const navigate = useNavigate();

  async function formHandle(e: React.FormEvent<HTMLFormElement>) {
    const ok = await logInUser(e);
    if (ok) navigate("/");
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <form
        className="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-6 shadow-sm sm:p-8"
        onSubmit={formHandle}
      >
        <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Log In
        </h1>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="emailUser"
            className="text-sm font-medium text-zinc-700"
          >
            Email<span className="text-red-500"> *</span>
          </label>
          <div className="flex items-center gap-2 border-b border-zinc-400 focus-within:border-indigo-600">
            <input
              id="emailUser"
              className="w-full bg-transparent py-2 text-base outline-none"
              type="email"
              name="emailUser"
              value={emailLog}
              onChange={(e) => setEmailLog(e.target.value)}
            />
            <img
              className="h-4 w-4 shrink-0"
              src={correctIcon}
              alt="correct-icon"
            />
            <img
              className="h-4 w-4 shrink-0"
              src={wrongIcon}
              alt="wrong-icon"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="passwordUser"
            className="text-sm font-medium text-zinc-700"
          >
            Password<span className="text-red-500"> *</span>
          </label>
          <div className="flex items-center gap-2 border-b border-zinc-400 focus-within:border-indigo-600">
            <input
              id="passwordUser"
              className="w-full bg-transparent py-2 text-base outline-none"
              type="password"
              name="passwordUser"
              value={passwordLog}
              onChange={(e) => setPasswordLog(e.target.value)}
            />
            <div className="flex shrink-0 items-center gap-2">
              <img
                className="h-4 w-4"
                src={passwordNotSeeIcon}
                alt="eyeClose-icon"
              />
              <img
                className="h-4 w-4"
                src={passwordSeeIcon}
                alt="eyeOpen-icon"
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <img className="h-4 w-4" src={correctIcon} alt="correct-icon" />
              <img className="h-4 w-4" src={wrongIcon} alt="wrong-icon" />
            </div>
          </div>
        </div>

        <button
          className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          type="submit"
        >
          Log In
        </button>
      </form>
    </section>
  );
};

export default LogIn;
