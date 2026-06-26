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
        >
          {" "}
          github •
        </Link>
        <Link
          className="footer-link"
          to={socials.linkedin}
          target="_blank"
        >
          {" "}
          linkedin •
        </Link>
        <Link
          className="footer-link"
          to={socials.email}
          target="_blank"
        >
          {" "}
          email
        </Link>
      </div>
      <div className="max-sm:hidden flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
        <p className="text-xl">rayan@roshanrayan.tech</p>
      </div>
    </footer>
  );
};

export default Footer;
