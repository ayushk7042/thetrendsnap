import { useState } from "react";
import { replyContact } from "../../../api/contact.api";
import "./Contact.css";



const ContactReplyModal = ({ contact, onClose, onSuccess }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    setLoading(true);
    await replyContact(contact._id, { message });
    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>{contact.subject || "Contact Message"}</h3>

        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Message:</strong></p>
        <p>{contact.message}</p>

        {contact.reply && (
          <div className="reply-box">
            <strong>Already Replied:</strong>
            <p>{contact.reply.message}</p>
          </div>
        )}

        <textarea
          placeholder="Reply message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleReply} disabled={loading}>
            {loading ? "Sending..." : "Send Reply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactReplyModal;
