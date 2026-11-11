import { useContext, useState } from "react";
import { dataContext } from "../context/contextApi.tsx";
import correctIcon from "../assets/correct-icon.png";
import wrongIcon from "../assets/wrong-icon.png";
import alertIcon from "../assets/alert-icon.png";
import passwordSeeIcon from "../assets/see-icon.png";
import passwordNotSeeIcon from "../assets/notSee-icon.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[\p{L}][\p{L}\s'-]*$/u;
const SPECIAL_CHARS = `-./',;&@#*)(_+:"~`;

// Shows the correct / wrong icon, but only once the field has been used
const StatusIcon = ({ show, valid }: { show: boolean; valid: boolean }) => {
  if (!show) return null;
  return (
    <img
      className="h-3 w-3 shrink-0"
      src={valid ? correctIcon : wrongIcon}
      alt={valid ? "correct-icon" : "wrong-icon"}
    />
  );
};

const Register = () => {
  const {
    firstName,
    lastName,
    age,
    email,
    password,
    setFirstName,
    setLastName,
    setAge,
    setEmail,
    setPassword,
    createUser,
    setView,
  } = useContext(dataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registerError, setRegisterError] = useState("");

  // Field validation
  const firstNameValid =
    firstName.trim().length >= 2 && NAME_REGEX.test(firstName.trim());
  const lastNameValid =
    lastName.trim().length >= 2 && NAME_REGEX.test(lastName.trim());
  const ageNumber = Number(age);
  const ageValid =
    age !== "" &&
    Number.isInteger(ageNumber) &&
    ageNumber >= 1 &&
    ageNumber <= 120;
  const emailValid = EMAIL_REGEX.test(email.trim());

  // Password rules
  const rules = {
    length: password.length >= 10 && password.length <= 40,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: [...password].some((c) => SPECIAL_CHARS.includes(c)),
  };
  const passwordValid = Object.values(rules).every(Boolean);

  const allValid =
    firstNameValid && lastNameValid && ageValid && emailValid && passwordValid;

  // Show an icon once the user typed something, or after a submit attempt
  const show = (value: string) => value.length > 0 || submitted;

  const passwordRules = [
    { ok: rules.length, text: "Length between 10 and 40 characters." },
    { ok: rules.lowercase, text: "At least one lowercase letter (a-z)." },
    { ok: rules.uppercase, text: "At least one capital letter (A-Z)." },
    { ok: rules.digit, text: "At least one digit (0-9)." },
    {
      ok: rules.special,
      text: `At least one special character: ${SPECIAL_CHARS}`,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setRegisterError("");

    if (!allValid) {
      setRegisterError("Please fix the fields marked in red.");
      return;
    }

    const ok = await createUser(e);
    if (ok) {
      setSubmitted(false);
      setView(true);
    } else {
      setRegisterError("Could not register. This email may already be in use.");
    }
  };

  return (
    <section>
      <form
        className="flex flex-col w-70 m-auto"
        onSubmit={handleSubmit}
        noValidate
      >
        <label htmlFor="firstName">
          First-name<span> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="firstName"
            className="border-b w-50"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <StatusIcon show={show(firstName)} valid={firstNameValid} />
        </div>
        {show(firstName) && !firstNameValid && (
          <p className="text-xs text-red-600">
            At least 2 letters, no numbers.
          </p>
        )}

        <label htmlFor="lastName">
          Last-name<span> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="lastName"
            className="border-b w-50"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <StatusIcon show={show(lastName)} valid={lastNameValid} />
        </div>
        {show(lastName) && !lastNameValid && (
          <p className="text-xs text-red-600">
            At least 2 letters, no numbers.
          </p>
        )}

        <label htmlFor="ageUser">
          Age<span> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="ageUser"
            className="border-b w-50"
            type="number"
            name="ageUser"
            min="1"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <StatusIcon show={show(age)} valid={ageValid} />
        </div>
        {show(age) && !ageValid && (
          <p className="text-xs text-red-600">Enter an age from 1 to 80.</p>
        )}

        <label htmlFor="emailUser">
          Email<span> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="emailUser"
            className="border-b w-50"
            type="email"
            name="emailUser"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <StatusIcon show={show(email)} valid={emailValid} />
        </div>
        {show(email) && !emailValid && (
          <p className="text-xs text-red-600">
            Enter a valid email, for example name@example.com
          </p>
        )}

        <label htmlFor="passwordUser">
          Password<span> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="passwordUser"
            className="border-b w-50"
            type={showPassword ? "text" : "password"}
            name="passwordUser"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
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

          <StatusIcon show={show(password)} valid={passwordValid} />
        </div>

        {/* Password rules: alert icon first, then correct / wrong */}
        <section className="flex flex-col gap-2.5 mt-10">
          {passwordRules.map((rule) => {
            const used = show(password);
            return (
              <div key={rule.text} className="flex items-start gap-5">
                <img
                  src={!used ? alertIcon : rule.ok ? correctIcon : wrongIcon}
                  width="20"
                  alt={
                    !used
                      ? "alert-icon"
                      : rule.ok
                        ? "correct-icon"
                        : "wrong-icon"
                  }
                />
                <p
                  className={
                    !used ? "" : rule.ok ? "text-green-700" : "text-red-600"
                  }
                >
                  {rule.text}
                </p>
              </div>
            );
          })}
        </section>

        {registerError && (
          <p className="mt-6 text-center text-sm font-medium text-red-600">
            {registerError}
          </p>
        )}

        <button
          className="border m-[50px_auto_80px_auto] p-2 w-35"
          type="submit"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
