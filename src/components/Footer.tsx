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
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 text-center md:grid-cols-3 md:text-left">
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-900">
            NAVIGATION
          </h2>
          <ul className="space-y-2">
            {navigationList.map((item) => (
              <li key={item.id} className="text-base text-gray-600">
                <Link
                  to={item.link}
                  className="transition-colors hover:text-zinc-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-900">
            INFORMATION
          </h2>
          <ul className="space-y-2">
            {infoList.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer text-base text-gray-600 transition-colors hover:text-zinc-900"
              >
                {item.info}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-900">
            Ask For Answers SOCIAL
          </h2>
          <ul className="flex items-center justify-center gap-4 md:justify-start">
            {socialList.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
              >
                <img
                  className="h-6 w-6 object-contain"
                  src={item.logo}
                  alt="social-icon"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-300 py-4 text-center">
        <small className="text-sm text-gray-500">
          © 2026 Ask For Answers. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
