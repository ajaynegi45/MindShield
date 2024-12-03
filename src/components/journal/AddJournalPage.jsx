// AddJournalPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AddJournalPage = ({ handleAddJournal,handleUpdateJournal,editJournal }) => {
  const [journalText, setJournalText] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Access state from navigation

  useEffect(() => {
    const editJournal = location.state?.journal; // Check for journal in state
    if (editJournal) {
      setJournalText(editJournal.content);
    }
  }, [location]);

  const handleTextChange = (e) => {
    setJournalText(e.target.value);
  };

  const handleAddClick = async () => {
    // Check if it's a new journal or an edit
    if (!location.state?.journal) { // Check for journal in state
      console.log("Journal added:", journalText);
      // Logic to handle adding the journal (e.g., save or submit the text)
      try {
        await handleAddJournal(journalText); // Your function to add a new journal
        setJournalText("");
        navigate("/journaling");
      } catch (error) {
        console.error("Error adding journal:", error);
      }
    } else { // Update existing journal
      const journalId = location.state.journal.id; // Get ID from state
      console.log("Journal updated:", journalText);
      try {
        await handleUpdateJournal(journalId, journalText); // Your function to update a journal
        setJournalText("");
        navigate("/journaling");
      } catch (error) {
        console.error("Error updating journal:", error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "10px",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="m.png"
            alt="Logo"
            style={{
              width: "40px",
              height: "auto",
              paddingLeft: "30px",
              paddingRight: "20px",
              marginRight: "10px",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              margin: 0,
              padding: 0,
              lineHeight: "0",
              verticalAlign: "middle",
            }}
          >
            MIND SHIELD
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "35px", marginLeft: "500px" }}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "grey", fontSize: "18px" }}>
            Home
          </Link>
          <a href="#emergency" style={{ textDecoration: "none", color: "grey", fontSize: "18px" }}>
            Emergency Contacts
          </a>
          <a href="#profile" style={{ textDecoration: "none", color: "grey", fontSize: "18px" }}>
            Profile
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src="reg_pic.png"
            alt="Right Image"
            style={{
              width: "300px",
              height: "auto",
            }}
          />
        </div>
      </nav>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "30px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ margin: 0 }}>{location.state?.journal ? "UPDATE JOURNAL" : "ADD JOURNAL"}</h1>

      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <textarea
          value={journalText}
          onChange={handleTextChange}
          placeholder="Write your journal here..."
          style={{
            width: "80%",
            height: "300px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "2px solid #ccc",
            resize: "vertical",
            marginBottom: "20px", // Adjusted margin to make room for the button
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleAddClick}
          style={{
            backgroundColor: "rgba(69, 143, 246, 1)",
            color: "white",
            fontSize: "18px",
            padding: "10px 30px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginBottom: "50px"
          }}
        >
          {location.state?.journal ? "UPDATE" : "ADD"}
        </button>
      </div>

      {/* Additional content or form could be added here */}
    </div>
  );
};

export default AddJournalPage;
