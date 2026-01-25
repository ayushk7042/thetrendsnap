// import { useEffect, useState } from "react";
// import {
//   fetchContacts,
//   replyContact,
//   deleteContact,
// } from "../../../api/contact.api";
// import "./Contact.css";

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [reply, setReply] = useState("");

//   const loadContacts = async () => {
//     const res = await fetchContacts();
//     setContacts(res.data);
//   };

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const sendReply = async (id) => {
//     await replyContact(id, reply);
//     setReply("");
//     loadContacts();
//   };

//   return (
//     <div className="contact-admin">
//       <h2>Contact Messages</h2>

//       {contacts.map((c) => (
//         <div className="contact-card" key={c._id}>
//           <h4>{c.name} ({c.email})</h4>
//           <p>{c.message}</p>

//           <textarea
//             placeholder="Reply..."
//             onChange={(e) => setReply(e.target.value)}
//           />

//           <div className="actions">
//             <button onClick={() => sendReply(c._id)}>Reply</button>
//             <button onClick={() => deleteContact(c._id)}>Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ContactList;


import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../../../api/contact.api";
import ContactReplyModal from "./ContactReplyModal";
import "./Contact.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchContacts = async () => {
    const res = await getContacts();
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete message?")) return;
    await deleteContact(id);
    fetchContacts();
  };

  return (
    <div className="contact-page">
      <h2>Contact Messages</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.subject}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => setSelected(c)}>View / Reply</button>
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <ContactReplyModal
          contact={selected}
          onClose={() => setSelected(null)}
          onSuccess={fetchContacts}
        />
      )}
    </div>
  );
};

export default ContactList;
