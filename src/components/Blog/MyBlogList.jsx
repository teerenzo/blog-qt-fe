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
    <div className="flex justify-center items-center w-full h-screen">
      {isBlogsLoading && <Loader />}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 p-6 w-full">
        {myBlogs.map((blog, index) => (
          <BlogCard key={index} blogData={blog} />
        ))}
      </div>
    </div>
  );
};

export default MyBlogSection;
