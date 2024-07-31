import BlogSection from "../components/Blog/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <section
        id="heroPage"
        className="bg-hero-pattern bg-cover bg-center flex flex-col items-start justify-center mt-20"
      >
        <h1 className="px-6 text-secondary mt-5 text-[32px] text-medium">
          Recent Blogs
        </h1>

        <BlogSection />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
