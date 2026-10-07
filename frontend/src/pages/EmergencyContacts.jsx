import { useEffect, useState } from "react";
import axios from "axios";
function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const loadContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/contacts"
      );

      setContacts(response.data);
    } catch (error) {
      console.error("Error loading contacts:", error);
      alert("Could not load emergency contacts.");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const addContact = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/contacts",
        {
          name: name,
          phone: phone,
          email: email
        }
      );

      setName("");
      setPhone("");
      setEmail("");

      loadContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Could not add contact.");
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/contacts/${id}`
      );

      loadContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Could not delete contact.");
    }
  };

  return (
    <div className="contacts-page">

      <h1>Emergency Contacts</h1>

      <p>Manage your emergency contacts here.</p>

      <form onSubmit={addContact} className="contact-form">

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          Add Contact
        </button>

      </form>

      <div className="contacts-list">

        <h2>Saved Emergency Contacts</h2>

        {contacts.length === 0 ? (
          <p>No emergency contacts saved yet.</p>
        ) : (
          contacts.map((contact) => (
            <div className="contact-card" key={contact.id}>

              <h3>{contact.name}</h3>

              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>

              <p>
                <strong>Email:</strong> {contact.email || "Not provided"}
              </p>

              <button
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default EmergencyContacts;