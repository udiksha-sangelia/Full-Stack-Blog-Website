import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Import CSS for styling
import Footer from "../components/Footer";


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);
  
  return (
    <div>
    <div className="home-container">
      <h1 className="hero-text">Read Our Blog</h1>
    </div>
    <div className="quotes">
      <p className="para">"Your daily source of inspiration and knowledge"</p>
        {/* <blockquote>"The secret of getting ahead is getting started." – Mark Twain</blockquote>
        <blockquote>"Do what you love, and you'll never work another day in your life." – Confucius</blockquote>
        <blockquote>"Creativity is intelligence having fun." – Albert Einstein</blockquote> */}
      </div> 
       <Footer />
       </div>
  );
};

export default Home;
