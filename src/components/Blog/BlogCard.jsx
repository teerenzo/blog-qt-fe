import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BlogModal from "./AddBlog";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../../redux/services/blog";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { fetchBlogsSuccess } from "../../redux/slices/blog";

const BlogCard = (blogData) => {
  const blog = blogData.blogData;
  const { isLogged } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  const [updateBlog, { isLoading: isBlogLoading }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isLoading }] = useDeleteBlogMutation();
  const {
    data: blogsData,
    isLoading: isBlogsLoading,
    error: blogsError,
  } = useGetBlogsQuery();

  const [isBlogOpen, setIsBlogOpen] = React.useState(false);
  const openBlog = () => setIsBlogOpen(true);
  const closeBlog = () => setIsBlogOpen(false);

  const dispatch = useDispatch();

  const handlerEditBlog = async (data) => {
    console.log("Data", data);
    try {
      const updatedBlog = {
        data,
        id: blog.id,
      };
      const response = await updateBlog(updatedBlog).unwrap();
      toast.success(`Blog updated successfully`);
      setTimeout(() => {
        closeBlog();
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error here", error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteBlog(id).unwrap();
      toast.success(`Blog deleted successfully`);
      setTimeout(() => {
        // refresh page
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error here", error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };
  return (
    <>
      <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full min-h-64 h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {blog && blog.title.length > 40
              ? blog.title.slice(0, 40) + "..."
              : blog.title}
          </h3>
          <p className="text-gray-700 mb-4">
            {blog.content.length > 100
              ? blog.content.slice(0, 100) + "..."
              : blog.content}
          </p>

          {/* <!-- adding date */}
          <p className="text-gray-700 mb-4">
            {new Date(blog.createdAt).toDateString()}
          </p>
          <div className="flex justify-between">
            <Link
              to={`/blog/${blog && blog.id}`}
              className="text-secondary hover:underline font-semibold"
            >
              Read More
            </Link>
            {isLogged && user?.id === blog.author.id && (
              <div className="space-x-6">
                <button
                  className="text-secondary hover:underline font-semibold"
                  onClick={openBlog}
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                {isLoading ? (
                  <Loader />
                ) : (
                  <a
                    onClick={() => handleDelete(blog.id)}
                    className="text-secondary hover:underline font-semibold"
                  >
                    <i class="fa-solid fa-trash text-red-800"></i>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <BlogModal
        action={handlerEditBlog}
        isOpen={isBlogOpen}
        onClose={closeBlog}
        data={blog}
      />
    </>
  );
};

export default BlogCard;
