import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "./About.css";

const About = () => {
  return (
    <>
      <Header />

      <div className="about-page">
        <h1>About Us</h1>
        <p>
          Welcome to TrendSnap! We are dedicated to bringing you the latest
          news, insights, and trending stories from around the world. Our team
          works tirelessly to ensure you stay informed and updated.
        </p>

        <h2>Our Mission</h2>
        <p>
          To deliver high-quality, unbiased news with speed, clarity, and
          reliability. We aim to provide a platform where readers can access
          trending stories, in-depth analysis, and more.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become the most trusted and comprehensive news platform for
          digital readers, empowering them with knowledge and insights.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default About;
