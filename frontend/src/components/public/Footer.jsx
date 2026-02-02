import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* ===== BRAND ===== */}
        <div className="footer-col">
          <h2 className="footer-logo">TrendSnap</h2>
          <p className="footer-desc">
            TrendSnap brings you the latest, trending and verified news from
            technology, business, entertainment and more.
          </p>
        </div>

        {/* ===== QUICK LINKS ===== */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/news">Latest News</Link></li>
            <li><Link to="/trending">Trending</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ===== CATEGORIES ===== */}
        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/category/technology">Technology</Link></li>
            <li><Link to="/category/business">Fashion</Link></li>
            <li><Link to="/category/entertainment">Celebrity-Beauty</Link></li>
            <li><Link to="/category/sports">Best-Dressed</Link></li>
            <li><Link to="/category/health">wedding-planning-and-advice</Link></li>
          </ul>
        </div>

        {/* ===== NEWSLETTER ===== */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe to get daily news updates.</p>

          <form className="footer-newsletter" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>

          {/* SOCIAL */}
          <div className="footer-social">
            <a href="#" aria-label="Facebook">🌐</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TrendSnap. All rights reserved.</p>

        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
