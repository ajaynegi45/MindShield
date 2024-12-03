import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const JournalForm = ({ onAddJournal, onEditJournal, editJournal }) => {
  const [error, setError] = useState(""); // New state for handling error messages
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (editJournal) {
      // You can handle anything if you still need to pass/edit the journal content, but it's removed here.
    }
  }, [editJournal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setError(""); // Clear any previous error messages

    // if (editJournal) {
    //   onEditJournal(editJournal.id); // Update without content
    // } else {
    //   onAddJournal(); // Add new journal with no content
    // }
    
    // Navigate to the AddJournalPage after form submission
    navigate('/add-journal'); // This line takes you to the AddJournalPage
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <h1 style={{ margin: 0 }}>JOURNALLING</h1>
        </div>

        {/* Removed the content section with textarea */}
        
        <button
          type="submit"
          style={{
            marginTop: "10px",
            marginLeft: "46%",
            background: "rgba(69, 143, 246, 1)",
            color: "white",
            padding: "13px",
            paddingBottom: "10px",
            marginBottom: "20px",
            border: "none",
            cursor: "pointer",
            fontSize: "17px",
            borderRadius: "15px",
            outline: "none",
          }}
        >
          Add Journal
        </button>
      </div>
    </form>
  );
};

export default JournalForm;
