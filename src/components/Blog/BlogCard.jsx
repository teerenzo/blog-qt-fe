import React from "react";

const BlogCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <a
          href={"blog/1"}
          className="text-secondary hover:underline font-semibold"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
