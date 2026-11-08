import Register from "../components/Register.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import LogIn from "../components/LogIn.tsx";
import { useContext } from "react";
import { dataContext } from "../context/contextApi.tsx";

const Account = () => {
  const { setView, view } = useContext(dataContext);

  return (
    <section>
      <Navbar />
      {view === false ? (
        <div className="w-80 m-[40px_auto_40px_auto]">
          <h3>Ask For Answers ID</h3>
          <h3>REGISTRATION</h3>
          <div>
            <p>Do you already have a Ask For Answers ID ? </p>
            <p>
              Log in
              <span onClick={() => setView((prev) => !prev)}> here</span>.
            </p>
          </div>
          <p>
            <span>* </span>Required fields
          </p>
        </div>
      ) : (
        <div className="w-80 m-[40px_auto_40px_auto]">
          <h3>Ask For Answers ID LOGIN</h3>
          <p>Don't have a Ask For Answers ID ?</p>
          <p>
            Register <span onClick={() => setView((prev) => !prev)}>here</span>.
          </p>
          <p>
            <span>* </span>Required fields
          </p>
        </div>
      )}

      {view === true ? <LogIn /> : <Register />}
      <Footer />
    </section>
  );
};

export default Account;
