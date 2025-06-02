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
      <div className="background-image"></div>
      <h1 className="hero-text">Dive Into a World of Knowledge and Creativity</h1>
    </div>
    <div className="quotes">
      <p className="para">"Your thoughts are the seeds of the universe. Every post, every idea you share, has the power to inspire, to illuminate, and to connect us across galaxies of curiosity. Welcome to a space where stories spark change, and every word shines bright in the infinite sky of knowledge."</p>
        {/* <blockquote>"The secret of getting ahead is getting started." – Mark Twain</blockquote>
        <blockquote>"Do what you love, and you'll never work another day in your life." – Confucius</blockquote>
        <blockquote>"Creativity is intelligence having fun." – Albert Einstein</blockquote> */}
      </div> 
       <Footer />
       </div>
  );
};

export default Home;
