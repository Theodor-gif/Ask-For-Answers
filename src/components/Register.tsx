import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";
import correctIcon from "../assets/correct-icon.png";
import wrongIcon from "../assets/wrong-icon.png";
import alertIcon from "../assets/alert-icon.png";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const ok = await createUser(e);
    if (ok) setView(true);
  };
  return (
    <section>
      <form className="flex flex-col w-70 m-auto" onSubmit={handleSubmit}>
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
          <img className="h-3 w-3" src={correctIcon} alt="correct-icon" />
          <img src={wrongIcon} alt="correct-icon" width="15" />
        </div>

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
          <img className="h-3 w-3" src={correctIcon} alt="correct-icon" />
          <img src={wrongIcon} alt="correct-icon" width="15" />
        </div>

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
          <img className="h-3 w-3" src={correctIcon} alt="correct-icon" />
          <img src={wrongIcon} alt="correct-icon" width="15" />
        </div>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img className="h-3 w-3" src={correctIcon} alt="correct-icon" />
          <img src={wrongIcon} alt="correct-icon" width="15" />
        </div>

        <section className="flex flex-col gap-2.5 mt-10">
          <div className="flex items-start gap-5">
            <img src={alertIcon} width="20" />
            <p>Length between 10 and 40 characters.</p>
          </div>
          <div className="flex items-start gap-5">
            <img src={alertIcon} width="20" />
            <p>{`At least one lowercase letter (az).`}</p>
          </div>
          <div className="flex items-start gap-5">
            <img src={alertIcon} width="20" />
            <p>{`At least one capital letter (AZ).`}</p>
          </div>
          <div className="flex items-start gap-5">
            <img src={alertIcon} width="20" />
            <p>{`At least one digit (0-9).`}</p>
          </div>
          <div className="flex items-start gap-5">
            <img src={alertIcon} width="20" />
            <p> At least one special character: {`-./',;&@#*)(_+:"~`}</p>
          </div>
        </section>

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
