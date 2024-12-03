import React from "react";
import { format } from "date-fns";
import { Link, useNavigate } from 'react-router-dom';

const JournalItem = ({ journal, onDeleteJournal, onEditJournal }) => {
  const navigate = useNavigate();

  const formattedDate = format(new Date(journal.createdAt), "PPpp");

  const handleEdit = () => {
    navigate(`/add-journal`, { state: { journal } }); // Navigate with journal data in state
  };

  return (
    
    <div style={{ border: "1px solid black", borderRadius:"10px", padding: "10px", marginBottom: "10px", background: " white" }}>
      <p style={{ background: "white", fontSize: "17px" }}>{journal.content}</p>
      <small style={{ background: "white" }}>Created At: {formattedDate}</small>
      <button
        style={{
          background: "rgba(69, 143, 246, 1)",
          borderRadius:"10px",
          color: "white",
          padding: "5px 10px",
          marginLeft: "25px",
          border: "none",
          cursor: "pointer",
          fontSize: "17px",
        }}
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        style={{
          background: "rgba(223, 58, 90, 1)",
          color: "white",
          padding: "5px 10px",
          marginLeft: "20px",
          border: "none",
          borderRadius:"10px",
          cursor: "pointer",
          fontSize: "17px",
        }}
        onClick={() => onDeleteJournal(journal.id)}
      >
        Delete
      </button>
      
    </div>
  );
};


export default JournalItem; // Ensure this is exported
