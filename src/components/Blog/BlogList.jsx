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
    <div className="h-screen flex justify-center  items-center w-full">
      {isBlogsLoading && <Loader />}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 p-6 w-full">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blogData={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
