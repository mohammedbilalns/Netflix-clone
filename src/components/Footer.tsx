import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex gap-5 mb-10 justify-start">
        <FaYoutube className="text-2xl cursor-pointer text-white" />
        <FaTwitter className="text-2xl cursor-pointer text-white" />
        <FaInstagram className="text-2xl cursor-pointer text-white" />
        <FaFacebook className="text-2xl cursor-pointer text-white" />
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left text-gray-300 text-sm">
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investors Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Information</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="text-gray-500 text-center mt-6 text-xs">
        &copy; 1997 - 2025 Netflix, Inc.
      </p>
    </div>
  );
};

export default Footer;
