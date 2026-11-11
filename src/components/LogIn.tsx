import correctIcon from "../assets/correct-icon.png";
import wrongIcon from "../assets/wrong-icon.png";
import passwordSeeIcon from "../assets/see-icon.png";
import passwordNotSeeIcon from "../assets/notSee-icon.png";
import { useContext, useState } from "react";
import { dataContext } from "../context/contextApi.tsx";
import { useNavigate } from "react-router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6; // change to match your Register rules

const LogIn = () => {
  const { emailLog, passwordLog, setEmailLog, setPasswordLog, logInUser } =
    useContext(dataContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Validation
  const emailValid = EMAIL_REGEX.test(emailLog.trim());
  const passwordValid = passwordLog.length >= MIN_PASSWORD_LENGTH;

  // Only show an icon once the user has typed something
  const emailTouched = emailLog.length > 0;
  const passwordTouched = passwordLog.length > 0;

  async function formHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError("");

    if (!emailValid || !passwordValid) {
      setLoginError("Please enter a valid email and password.");
      return;
    }

    const ok = await logInUser(e);
    if (ok) {
      navigate("/");
    } else {
      setLoginError("Wrong email or password. Please try again.");
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <form
        className="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-6 shadow-sm sm:p-8"
        onSubmit={formHandle}
        noValidate
      >
        <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Log In
        </h1>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="emailUser"
            className="text-sm font-medium text-zinc-700"
          >
            Email<span className="text-red-500"> *</span>
          </label>
          <div
            className={`flex items-center gap-2 border-b focus-within:border-indigo-600 ${
              emailTouched && !emailValid ? "border-red-500" : "border-zinc-400"
            }`}
          >
            <input
              id="emailUser"
              className="w-full bg-transparent py-2 text-base outline-none"
              type="email"
              name="emailUser"
              value={emailLog}
              onChange={(e) => setEmailLog(e.target.value)}
              autoComplete="email"
            />
            {emailTouched && (
              <img
                className="h-4 w-4 shrink-0"
                src={emailValid ? correctIcon : wrongIcon}
                alt={emailValid ? "correct-icon" : "wrong-icon"}
              />
            )}
          </div>
          {emailTouched && !emailValid && (
            <p className="text-xs text-red-600">
              Enter a valid email, for example name@example.com
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="passwordUser"
            className="text-sm font-medium text-zinc-700"
          >
            Password<span className="text-red-500"> *</span>
          </label>
          <div
            className={`flex items-center gap-2 border-b focus-within:border-indigo-600 ${
              passwordTouched && !passwordValid
                ? "border-red-500"
                : "border-zinc-400"
            }`}
          >
            <input
              id="passwordUser"
              className="w-full bg-transparent py-2 text-base outline-none"
              type={showPassword ? "text" : "password"}
              name="passwordUser"
              value={passwordLog}
              onChange={(e) => setPasswordLog(e.target.value)}
              autoComplete="current-password"
            />

            {/* Show / hide password */}
            <button
              type="button"
              className="shrink-0 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              <img
                className="h-4 w-4"
                src={showPassword ? passwordSeeIcon : passwordNotSeeIcon}
                alt={showPassword ? "eyeOpen-icon" : "eyeClose-icon"}
              />
            </button>

            {passwordTouched && (
              <img
                className="h-4 w-4 shrink-0"
                src={passwordValid ? correctIcon : wrongIcon}
                alt={passwordValid ? "correct-icon" : "wrong-icon"}
              />
            )}
          </div>
          {passwordTouched && !passwordValid && (
            <p className="text-xs text-red-600">
              Password must have at least {MIN_PASSWORD_LENGTH} characters.
            </p>
          )}
        </div>

        {loginError && (
          <p className="text-center text-sm font-medium text-red-600">
            {loginError}
          </p>
        )}

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
