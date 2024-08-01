import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetailsPage from "./components/Blog/BlogDetails";
import MyBlog from "./pages/MyBlogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
        <Route path="/my-blogs" element={<MyBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
