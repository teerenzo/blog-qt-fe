import BlogSection from "../components/Blog/BlogList";
import MyBlogSection from "../components/Blog/MyBlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MyBlog = () => {
  return (
    <div>
      <Header />
      <section
        id="heroPage"
        className="bg-hero-pattern bg-cover bg-center flex flex-col items-start justify-center mt-20 w-[100%]"
      >
        <h1 className="px-6 text-secondary mt-5 text-[32px] text-medium">
          My Blogs
        </h1>

        <MyBlogSection />
      </section>
      <Footer />
    </div>
  );
};

export default MyBlog;
