import React from "react";
import { format } from "date-fns";
import Footer from "../Footer";
import Header from "../Header";
import { useFormik } from "formik";
import * as Yup from "yup";

const BlogDetailsPage = () => {
  const blog = {
    title: "Technology advancement",
    imageUrl: "https://via.placeholder.com/1200x600",
    content: `
      <p>Technology advances by keeping an eye on the new app designed by various industries. This has risen the development of countries due to the GDP of the economy. Technology advances by keeping an eye on the new app designed by various industries. This has risen the development of countries due to the GDP of the economy.</p>
    `,
    author: "John Doe",
    date: "2024-07-31",
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
      // Handle form submission logic here
      // e.g., sending data to a server

      resetForm(); // Reset form fields after submission
    },
  });

  return (
    <>
      <Header />
      <section id="blogContent" className="my-8 mx-5 lg:mx-20 mt-20">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 text-gray-200">
            <h3 className="text-2xl font-semibold text-white mb-4">
              {blog.title}
            </h3>
            <p className="text-gray-400 mb-6">
              <span className="block mb-2">
                Technology advances by keeping an eye on the new app designed by
                various industries. This has risen the development of countries
                due to the GDP of the economy.
              </span>
            </p>
            <div className="flex flex-wrap gap-4 mb-6 text-white">
              <button
                id="likeButton"
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md flex items-center gap-2"
              >
                <i className="fa-solid fa-thumbs-up"></i> Like
              </button>
              <span id="likeCount">0 Likes</span>
              <span id="commentCount" className="flex items-center gap-2">
                <i className="fa-solid fa-comments"></i>{" "}
                <span id="commentCountNumber">0 Comments</span>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
                <div>
                  <span className="text-secondary font-semibold">
                    Jayden Mugisha
                  </span>
                  <p className="text-gray-300 mt-1">
                    The content is awesome. Keep giving us more!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-white text-lg mb-4">Leave a Comment</p>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Names"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                {...formik.getFieldProps("firstname")}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.firstname}
                </div>
              ) : null}
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <textarea
              id="message"
              name="message"
              placeholder="Place your message here..."
              rows="8"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              {...formik.getFieldProps("message")}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm">
                {formik.errors.message}
              </div>
            ) : null}
            <button
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              SEND
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetailsPage;
