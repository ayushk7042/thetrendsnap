// import { useState } from "react";
// import { createContact } from "../../api/contact.api";
// import Header from "../../components/public/Header";

// const Contact = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createContact(form);
//       alert("Message sent successfully");
//       setForm({ name: "", email: "", message: "" });
//     } catch (err) {
//       console.error("Contact error:", err);
//       alert("Failed to send message");
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className="contact-page">
//         <h1>Contact Us</h1>

//         <form onSubmit={handleSubmit}>
//           <input
//             name="name"
//             placeholder="Your Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="email"
//             type="email"
//             placeholder="Your Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <textarea
//             name="message"
//             placeholder="Your Message"
//             value={form.message}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Send Message</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Contact;




import { useState } from "react";
import { createContact } from "../../api/contact.api";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "./Contact.css"; // CSS file

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(form);
      alert("Message sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact error:", err);
      alert("Failed to send message");
    }
  };

  return (
    <>
      <Header />

      <div className="contact-page-container">
        <h1>Contact Us</h1>

        <div className="contact-content">

          {/* ===== CONTACT FORM ===== */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button type="submit">Send Message</button>
            </form>
          </div>

          {/* ===== GOOGLE MAP ===== */}
          <div className="contact-map">
            <h2>Our Location</h2>
            <iframe
              title="Gurgaon Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.842537293374!2d77.05449707499615!3d28.46072198244183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e5ed0fa4d0b%3A0x32c74c4a7a851c29!2sUrban%20Tower%2C%20Sec%2062%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
