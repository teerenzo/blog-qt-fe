import React, { useState } from "react";
import LoginModal from "./auth/login";
import SignUpModal from "./auth/register";
import BlogModal from "./Blog/AddBlog";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const openBlog = () => setIsBlogOpen(true);
  const closeBlog = () => setIsBlogOpen(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  return (
    <section
      id="navbar"
      className="bg-white fixed top-0 w-full flex justify-between items-center p-4 shadow-md z-50"
    >
      <h2 className="text-lg font-bold">
        <Link href="/" className="text-gray-900">
          BlogApp
        </Link>
      </h2>
      <div className="flex items-center gap-4">
        <ul className="flex list-none space-x-4">
          <li>
            <a
              onClick={openBlog}
              className="text-gray-700 hover:text-secondary transition-colors duration-300"
            >
              Add Blog
            </a>
          </li>
          <li>
            <a
              href="#blogs"
              className="text-gray-700 hover:text-secondary transition-colors duration-300"
            >
              My Blogs
            </a>
          </li>

          <li>
            <a
              onClick={openSignUp}
              className="text-gray-700 hover:text-secondary transition-colors duration-300"
            >
              Sign Up
            </a>
          </li>
        </ul>

        <button className="bg-secondary text-white py-2 px-4 rounded hover:bg-secondary-dark transition-colors duration-300">
          <a href="#" onClick={openLogin}>
            SIGN IN
          </a>
        </button>
      </div>
      <div className="mobileMenu block md:hidden cursor-pointer">
        <span className="block w-6 h-0.5 bg-secondary my-1 rounded transition-transform duration-300"></span>
        <span className="block w-6 h-0.5 bg-secondary my-1 rounded transition-transform duration-300"></span>
        <span className="block w-6 h-0.5 bg-secondary my-1 rounded transition-transform duration-300"></span>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUp} />
      <BlogModal isOpen={isBlogOpen} onClose={closeBlog} />
    </section>
  );
};

export default Header;
