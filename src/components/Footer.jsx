import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const { blogs, myBlogs } = useSelector((state) => state.blogs);

  return (
    <section
      id="footer"
      className={
        `bg-secondary text-white py-8 absolute w-full  md:bottom-auto ` +
        (blogs.length > 0 || myBlogs.length > 0 ? "" : "bottom-0")
      }
    >
      <div className="mx-4 md:mx-8 lg:mx-16 flex flex-wrap justify-between py-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">My Social Links</h3>
          <div className="flex gap-6 mt-4 text-gray-300">
            <a
              href="https://facebook.com"
              className="hover:text-white transition-colors duration-300"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-white transition-colors duration-300"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-white transition-colors duration-300"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Keep In Touch</h3>
          <p className="flex items-center gap-3 text-gray-400">
            <i className="fab fa-github text-xl"></i> @Teerenzo on GitHub
          </p>
          <p className="flex items-center gap-3 text-gray-400">
            <i className="fas fa-envelope text-xl"></i> teerenzo.co@gmail.com
          </p>
          <p className="flex items-center gap-3 text-gray-400">
            <i className="fas fa-location-dot text-xl"></i> KIGALI - RWANDA
          </p>
          <p className="flex items-center gap-3 text-gray-400">
            <i className="fas fa-phone-volume text-xl"></i> +250 780640237
          </p>
        </div>
      </div>
      <div className="text-center py-4 text-gray-300">
        <p>&copy; Emmanuel Renzaho </p>
      </div>
    </section>
  );
};

export default Footer;
