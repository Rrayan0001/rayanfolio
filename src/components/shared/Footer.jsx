import { socials } from "@/constants";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex justify-between  text-3xl gap-7 w-[80%] mx-auto border-t border-dark-4 py-11 max-sm:pt-7  max-sm:justify-center max-sm:items-center whitespace-nowrap">
      <div className="">
        <Link className="footer-link" to="" onClick={handleScrollToTop}>
          ^ •
        </Link>
        <Link
          className="footer-link"
          to={socials.github}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label="Mohamed Roshan Rayan GitHub Profile"
        >
          {" "}
          github •
        </Link>
        <Link
          className="footer-link"
          to={socials.linkedin}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label="Mohamed Roshan Rayan LinkedIn Profile"
        >
          {" "}
          linkedin •
        </Link>
        <Link
          className="footer-link"
          to={socials.email}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send email to Mohamed Roshan Rayan"
        >
          {" "}
          email
        </Link>
      </div>
      <div className="max-sm:hidden flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Mohamed Roshan Rayan (Roshan Rayan) Logo"
          className="w-7 h-7 object-contain"
          width="28"
          height="28"
        />
        <p className="text-xl">rayan@roshanrayan.tech</p>
      </div>
    </footer>
  );
};

export default Footer;
