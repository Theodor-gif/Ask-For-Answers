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
    <section>
      <form className="flex flex-col w-70 m-auto" onSubmit={formHandle}>
        <label htmlFor="emailUser">
          Email<span> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="emailUser"
            className="border-b w-50"
            type="email"
            name="emailUser"
            value={emailLog}
            onChange={(e) => setEmailLog(e.target.value)}
          />
          <img className="h-3 w-3" src={correctIcon} alt="correct-icon" />
          <img src={wrongIcon} alt="correct-icon" width="15" />
        </div>

        <label htmlFor="passwordUser">
          Password<span> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="passwordUser"
            className="border-b w-50"
            type="password"
            name="passwordUser"
            value={passwordLog}
            onChange={(e) => setPasswordLog(e.target.value)}
          />
          <div className="flex gap-2">
            <img src={passwordNotSeeIcon} alt="eyeClose-icon" width="15" />
            <img src={passwordSeeIcon} alt="eyeOpen-Icon" width="15" />
          </div>
          <div className="flex gap-2">
            <img className="h-3 w-3" src={correctIcon} alt="correct-icon" />
            <img src={wrongIcon} alt="correct-icon" width="15" />
          </div>
        </div>

        <button
          className="border m-[50px_auto_80px_auto] p-2 w-35"
          type="submit"
        >
          Log In
        </button>
      </form>
    </section>
  );
};

export default LogIn;
