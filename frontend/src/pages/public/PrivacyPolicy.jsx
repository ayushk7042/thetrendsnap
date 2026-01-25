import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />

      <div className="privacy-page">
        <h1>Privacy Policy</h1>
        <p>
          At TrendSnap, we value your privacy. This policy outlines how we
          collect, use, and protect your information when you visit our
          website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          and messages you send through our contact form. We also collect
          non-personal information such as website usage statistics.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          Your information is used to respond to your inquiries, improve our
          website, and provide relevant content. We do not share personal
          information with third parties without your consent.
        </p>

        <h2>Cookies & Tracking</h2>
        <p>
          We use cookies to enhance your experience, analyze website traffic,
          and provide personalized content.
        </p>

        <h2>Security</h2>
        <p>
          We implement reasonable security measures to protect your
          information. However, no method of transmission over the Internet is
          100% secure.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
