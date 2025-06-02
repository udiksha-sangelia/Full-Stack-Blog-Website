import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
// import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPage";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
    const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // Convert token to boolean
    };

    checkAuth(); 

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* <Route path="/" element={<PostList />} /> */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        
        <Route path="/blogs" element={isAuthenticated ? <BlogList /> : <Navigate to="/login" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/create" element={ <PostForm /> } />
        <Route path="/edit/:id" element={ <EditPost /> } />
        <Route path="/post/:id" element={ <PostDetail /> } />
        {/* <Route path="/post/:id/page" element={ <PostPage /> } />  */}
      </Routes>
    </Router>
  );
};

export default App;

