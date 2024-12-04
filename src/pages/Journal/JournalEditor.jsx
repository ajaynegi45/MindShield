import { useState } from "react";
import "./JournalEditor.css";
import { createJournal } from "../../services/JournalService";
import { toast } from "sonner";

const JournalEditor = ({ closePopup }) => {  // Accept closePopup function as prop
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePublish = async () => {
        try {
            if (!title) {
                toast.error("Please enter journal title");
            } else if (!content) {
                toast.error("Please enter journal content");
            } else {
                await createJournal(title, content);
                toast.success("Journal created successfully.");
                closePopup(); // Close the popup after journal is published
            }
        } catch (error) {
            console.error("Error saving journal:", error);
            toast.error("Error saving journal:", error);
        }
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <button className="add-button">
                    <i className="icon-image"/> Add Cover
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
