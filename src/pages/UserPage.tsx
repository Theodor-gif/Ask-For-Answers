import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { dataContext } from "../context/contextApi.tsx";
import Navbar from "../components/Navbar.tsx";

const CreateUser = () => {
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
  } = useContext(dataContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const ok = await createUser(e);
    if (ok) navigate("/");
  };
  return (
    <section>
      <Navbar />
      <h2>Create user</h2>
      <form className="flex flex-col w-50" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First-name</label>
        <input
          id="firstName"
          className="border"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last-name</label>
        <input
          id="lastName"
          className="border"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="ageUser">Age</label>
        <input
          id="ageUser"
          className="border"
          type="number"
          name="ageUser"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="emailUser">Email</label>
        <input
          id="emailUser"
          className="border"
          type="email"
          name="emailUser"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="passwordUser">Password</label>
        <input
          id="passwordUser"
          className="border"
          type="password"
          name="passwordUser"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border mt-5 p-2" type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default CreateUser;
