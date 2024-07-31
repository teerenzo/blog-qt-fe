import React from 'react';
import BlogCard from './BlogCard';

const BlogSection = () => {
  const blogs = [
    {
      title: 'Understanding React Hooks',
      description: 'A comprehensive guide to React Hooks, including useState, useEffect, and custom hooks.',
      image: 'https://via.placeholder.com/400x300',
      link: '/blog/react-hooks'
    },
    {
      title: 'Tailwind CSS for Beginners',
      description: 'Learn how to use Tailwind CSS to build modern and responsive user interfaces.',
      image: 'https://via.placeholder.com/400x300',
      link: '/blog/tailwind-css'
    },
    {
        title: 'Tailwind CSS for Beginners',
        description: 'Learn how to use Tailwind CSS to build modern and responsive user interfaces.',
        image: 'https://via.placeholder.com/400x300',
        link: '/blog/tailwind-css'
      }
      ,
      {
        title: 'Tailwind CSS for Beginners',
        description: 'Learn how to use Tailwind CSS to build modern and responsive user interfaces.',
        image: 'https://via.placeholder.com/400x300',
        link: '/blog/tailwind-css'
      },
      {
        title: 'Tailwind CSS for Beginners',
        description: 'Learn how to use Tailwind CSS to build modern and responsive user interfaces.',
        image: 'https://via.placeholder.com/400x300',
        link: '/blog/tailwind-css'
      },
      {
        title: 'Tailwind CSS for Beginners',
        description: 'Learn how to use Tailwind CSS to build modern and responsive user interfaces.',
        image: 'https://via.placeholder.com/400x300',
        link: '/blog/tailwind-css'
      }
    // Add more blog posts here
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          link={blog.link}
        />
      ))}
    </div>
  );
};

export default BlogSection;
