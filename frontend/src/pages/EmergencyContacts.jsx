
import { useEffect, useState } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/contacts`;

function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API);
      setContacts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Loading contacts failed:", err);
      setError(
        err.response?.status === 401 || err.response?.status === 403
          ? "Access denied. Check backend security settings."
          : "Could not load contacts. Make sure the backend is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const addContact = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(API, {
        name: name.trim(),
        phone: phone.trim(),
        relationship: relationship.trim()
      });

      setName("");
      setPhone("");
      setRelationship("");

      await loadContacts();
      alert("Emergency contact saved!");
    } catch (err) {
      console.error("Adding contact failed:", err);
      setError(
        err.response?.status === 401 || err.response?.status === 403
          ? "Access denied. Check backend security settings."
          : "Could not save contact. Check the backend and try again."
      );
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this emergency contact?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      await loadContacts();
    } catch (err) {
      console.error("Deleting contact failed:", err);
      setError("Could not delete contact.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
      <h1>Emergency Contacts</h1>
      <p>Add and manage your emergency contacts.</p>

      <form
        onSubmit={addContact}
        style={{
          display: "grid",
          gap: "12px",
          marginBottom: "25px"
        }}
      >
        <input
          type="text"
          placeholder="Contact name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Relationship (e.g. Family, Friend)"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          required
        />

        <button type="submit">Save Emergency Contact</button>
      </form>

      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>
          <p>{error}</p>
          <button onClick={loadContacts}>Try Again</button>
        </div>
      )}

      <h2>Saved Emergency Contacts</h2>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No saved contacts found.</p>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "12px"
            }}
          >
            <h3>{contact.name}</h3>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p>
              <strong>Relationship:</strong>{" "}
              {contact.relationship || "Not provided"}
            </p>
            <button onClick={() => deleteContact(contact.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default EmergencyContacts;
