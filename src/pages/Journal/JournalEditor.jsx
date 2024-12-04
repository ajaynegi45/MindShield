import { useState } from "react";
import "./JournalEditor.css";
import { createJournal } from "../../services/JournalService";

const JournalEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePublish = async () => {
        try {
            await createJournal(title, content);
            alert("Journal saved!");
        } catch (error) {
            console.error("Error saving journal:", error);
            alert("Failed to save journal.");
        }
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <button className="add-button">
                    <i className="icon-image" /> Add Cover
                </button>
            </div>
            <div className="editor-body">
                {/* Editable Title */}
                <div
                    className={`journal-title ${title ? "filled" : ""}`}
                    contentEditable="true"
                    onInput={(e) => setTitle(e.target.innerText)}
                    data-placeholder="Journal Title..."
                ></div>

                {/* Editable Body */}
                <div
                    className={`journal-body ${content ? "filled" : ""}`}
                    contentEditable="true"
                    onInput={(e) => setContent(e.target.innerText)}
                    data-placeholder="Start writing your journal..."
                ></div>
            </div>
            <button className="publish-button" onClick={handlePublish}>
                Publish
            </button>
        </div>
    );
};

export default JournalEditor;
