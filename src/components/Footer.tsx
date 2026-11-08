import { Link } from "react-router";
import facebook from "../assets/facebook-icon.png";
import youtube from "../assets/youtube-icon.png";
import twitter from "../assets/twitter-icon.png";
import instagram from "../assets/instagram-icon.png";

const Footer = () => {
  type navType = {
    id: string;
    name: string;
    link: string;
  };

  type logoType = {
    id: string;
    logo: string;
  };

  type infoType = {
    id: string;
    info: string;
  };

  const navigationList: navType[] = [
    { id: "1", name: "Home", link: "/" },
    { id: "2", name: "Posts", link: "/posts" },
    { id: "3", name: "Create Post", link: "/create" },
    { id: "4", name: "Account", link: "/create" },
  ];

  const socialList: logoType[] = [
    { id: "1", logo: facebook },
    { id: "2", logo: youtube },
    { id: "3", logo: twitter },
    { id: "4", logo: instagram },
  ];

  const infoList: infoType[] = [
    { id: "1", info: "COOKIE POLICY" },
    { id: "2", info: "PRIVACY POLICY" },
    { id: "3", info: "TERMS AND CONDITIONS" },
  ];

  return (
    <footer className="bg-zinc-200">
      <h2>NAVIGATION</h2>
      <ul>
        {navigationList.map((item) => (
          <li key={item.id} className="text-gray-600 text-base">
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <h2>INFORMATION</h2>
      <ul>
        {infoList.map((item) => (
          <li key={item.id} className="text-gray-600 text-base">
            {item.info}
          </li>
        ))}
      </ul>
      <h2 className="">Ask For Answers SOCIAL</h2>
      <ul>
        {socialList.map((item) => (
          <li key={item.id}>
            <img src={item.logo} alt="social-icon" width="15" />
          </li>
        ))}
      </ul>
      <small></small>
    </footer>
  );
};

export default Footer;
