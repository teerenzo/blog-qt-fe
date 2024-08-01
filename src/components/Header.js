import React, { useState } from "react";
import LoginModal from "./auth/login";
import SignUpModal from "./auth/register";
import BlogModal from "./Blog/AddBlog";
import { Link } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../redux/services/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logginUser } from "../redux/slices/Auth/login";
import { loginMode, logoutMode } from "../redux/slices/Auth/auth";
import { useCreateBlogMutation } from "../redux/services/blog";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const { isLogged } = useSelector((state) => state.auth);

  const openBlog = () => setIsBlogOpen(true);
  const closeBlog = () => setIsBlogOpen(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const [createBlog, { isLoading: isBlogLoading }] = useCreateBlogMutation();

  const dispatch = useDispatch();

  const handleRegister = async (data1) => {
    delete data1.confirmPassword;
    try {
      const { data } = await register(data1).unwrap();
      toast.success(`Account created successFull`);
      setTimeout(() => {
        closeSignUp();
        openLogin();
      }, 2000);
    } catch (error) {
      console.log("Error here", error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await login(data).unwrap();
      console.log("Login", response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.user.id);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isLogged", true);
      dispatch(logginUser(response.user));
      dispatch(loginMode());
      toast.success(`Welcome back!`);
      setTimeout(() => {
        closeLogin();
      }, 2000);
    } catch (error) {
      console.log("Error here", error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const handleAddBlog = async (data) => {
    console.log("Data", data);
    try {
      const response = await createBlog(data).unwrap();
      console.log("Blog", response);
      toast.success(`Blog added successfully`);
      setTimeout(() => {
        closeBlog();
      }, 2000);
    } catch (error) {
      console.log("Error here", error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    localStorage.removeItem("isLogged");
    dispatch(logoutMode());
  };

  return (
    <section
      id="navbar"
      className="bg-white fixed top-0 w-full flex justify-between items-center p-4 shadow-md z-50"
    >
      <h2 className="text-lg font-bold">
        <Link to="/" className="text-gray-900">
          BlogApp
        </Link>
      </h2>
      <div className="flex items-center gap-4">
        <ul className="flex list-none space-x-4">
          {isLogged && (
            <li>
              <a
                onClick={openBlog}
                className="text-gray-700 hover:text-secondary transition-colors duration-300"
              >
                Add Blog
              </a>
            </li>
          )}
          {isLogged && (
            <li>
              <Link
                to="/my-blogs"
                className="text-gray-700 hover:text-secondary transition-colors duration-300"
              >
                My Blogs
              </Link>
            </li>
          )}

          {!isLogged && (
            <li>
              <a
                onClick={openSignUp}
                className="text-gray-700 hover:text-secondary transition-colors duration-300"
              >
                Sign Up
              </a>
            </li>
          )}

          {isLogged && (
            <li>
              <a
                onClick={handleLogout}
                className="text-gray-700 hover:text-secondary transition-colors duration-300"
              >
                Log out
              </a>
            </li>
          )}
        </ul>
        {!isLogged && (
          <button className="bg-secondary text-white py-2 px-4 rounded hover:bg-secondary-dark transition-colors duration-300">
            <a href="#" onClick={openLogin}>
              SIGN IN
            </a>
          </button>
        )}
      </div>
      <div className="mobileMenu block md:hidden cursor-pointer">
        <span className="block w-6 h-0.5 bg-secondary my-1 rounded transition-transform duration-300"></span>
        <span className="block w-6 h-0.5 bg-secondary my-1 rounded transition-transform duration-300"></span>
        <span className="block w-6 h-0.5 bg-secondary my-1 rounded transition-transform duration-300"></span>
      </div>
      <LoginModal
        login={handleLogin}
        isOpen={isLoginOpen}
        onClose={closeLogin}
      />
      <SignUpModal
        register={handleRegister}
        isOpen={isSignUpOpen}
        onClose={closeSignUp}
      />
      <BlogModal
        action={handleAddBlog}
        isOpen={isBlogOpen}
        onClose={closeBlog}
      />
    </section>
  );
};

export default Header;
