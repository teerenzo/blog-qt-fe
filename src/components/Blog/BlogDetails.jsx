import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Footer from "../Footer";
import Header from "../Header";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  useCommentOnBlogMutation,
  useGetBlogByIdQuery,
} from "../../redux/services/blog";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogSuccess } from "../../redux/slices/blog";
import { tr } from "date-fns/locale/tr";
import toast from "react-hot-toast";
import { is } from "date-fns/locale";
import { se } from "date-fns/locale/se";
import Loader from "../Loader";

const BlogDetailsPage = () => {
  const { blogId } = useParams();

  const { isLogged } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: blogData,
    isLoading: isBlogLoading,
    error: blogError,
  } = useGetBlogByIdQuery(blogId);

  const [commentOnBlog, { isLoading: isCommentLoading }] =
    useCommentOnBlogMutation();

  const { blog } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogData) {
      dispatch(fetchBlogSuccess(blogData.data));
    }
  }, [blogData, dispatch]);

  const refreshPage = () => {
    window.location.reload();
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setIsLoading(true);
      try {
        const response = await commentOnBlog({
          id: blogId,
          content: values.message,
        });

        console.log(response);
        setSubmitting(false);
        setIsLoading(false);
        toast.success("Comment added successfully");

        setTimeout(() => {
          refreshPage();
        }, 2000);
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        setIsLoading(false);
        toast.error("Something went wrong");
      }

      resetForm(); // Reset form fields after submission
    },
  });

  return (
    <>
      <Header />
      <section id="blogContent" className="my-8 mx-5 lg:mx-20 mt-20">
        {isBlogLoading && <Loader />}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-lg max-h-96"
            />
          </div>
          <div className="flex-1 text-gray-200">
            <h3 className="text-2xl font-semibold text-white mb-4">
              {blog.title}
            </h3>
            <p className="text-gray-400 mb-6">
              <span className="block mb-2">{blog.content}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-6 text-secondary mt-10">
          <button
            id="likeButton"
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md flex items-center gap-2"
          >
            <i className="fa-solid fa-thumbs-up"></i> Like
          </button>
          <span id="likeCount">0 Likes</span>
          <span id="commentCount" className="flex items-center gap-2">
            <i className="fa-solid fa-comments"></i>{" "}
            <span id="commentCountNumber">
              {blog.comments?.length} Comments
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          {blog.comments?.map((comment, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300 text-secondary text-center flex justify-center items-center">
                {`${comment.author.firstName[0]} ${comment.author.lastName[0]}`}
              </div>
              <div>
                <span className="text-secondary font-semibold">
                  {comment.author.firstName + " " + comment.author.lastName}
                </span>
                <p className="text-gray-300 mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
          {!blog.comments?.length && (
            <p className="text-gray-300">No comments yet</p>
          )}
        </div>
        {isLogged && (
          <div className="mt-10">
            <p className="text-secondary text-lg mb-4">Leave a Comment</p>
            <Formik
              initialValues={{ message: "" }}
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              {({ isSubmitting }) => (
                <Form>
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
                    {isLoading ? "SENDING..." : "SEND"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default BlogDetailsPage;
