import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import {
  useGetBlogsByUserQuery,
  useGetBlogsQuery,
} from "../../redux/services/blog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogsSuccess,
  fetchMyBlogsSuccess,
} from "../../redux/slices/blog";
import Loader from "../Loader";

const MyBlogSection = () => {
  const {
    data: blogsData,
    isLoading: isBlogsLoading,
    error: blogsError,
  } = useGetBlogsByUserQuery();

  const { myBlogs } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogsData) {
      dispatch(fetchMyBlogsSuccess(blogsData.posts));
    }
  }, [blogsData, dispatch]);

  return (
    <div className=" min-h-96 w-full ">
      {isBlogsLoading && (
        <div className="flex flex-col justify-center content-center justify-items-center items-center h-full ">
          <Loader />{" "}
        </div>
      )}

      {!myBlogs.length && !isBlogsLoading && (
        <div className="flex flex-col justify-center content-center justify-items-center items-center h-full ">
          <p className="text-xl">
            {" "}
            {blogsError ? "Error fetching blogs" : "No blogs found"}
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 p-6 w-full">
        {myBlogs.map((blog, index) => (
          <BlogCard key={index} blogData={blog} />
        ))}
      </div>
    </div>
  );
};

export default MyBlogSection;
