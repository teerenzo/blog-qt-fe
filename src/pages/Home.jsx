import BlogSection from "../components/Blog/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRegisterMutation } from "../redux/services/auth";

const Home = () => {
  return (
    <div>
      <Header />
      <section
        id="heroPage"
        className="bg-hero-pattern bg-cover bg-center mt-20 w-[100%]"
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
