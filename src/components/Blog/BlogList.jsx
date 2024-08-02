import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import { useGetBlogsQuery } from "../../redux/services/blog";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsSuccess } from "../../redux/slices/blog";
import Loader from "../Loader";

const BlogSection = () => {
  const {
    data: blogsData,
    isLoading: isBlogsLoading,
    error: blogsError,
  } = useGetBlogsQuery();

  const { blogs } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogsData) {
      dispatch(fetchBlogsSuccess(blogsData.posts));
    }
  }, [blogsData, dispatch]);

  return (
    <div className="min-h-96 w-full ">
      {isBlogsLoading && (
        <div className="flex flex-col justify-center content-center justify-items-center items-center ">
          <Loader />{" "}
        </div>
      )}

      {!blogs.length && !isBlogsLoading && (
        <div className="flex flex-col justify-center content-center justify-items-center items-center h-full ">
          <p className="text-xl">
            {blogsError ? "Error fetching blogs" : "No blogs found"}
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 p-6 w-full">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blogData={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
