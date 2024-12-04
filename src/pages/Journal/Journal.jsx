import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getJournals } from "../../services/JournalService";  // Assuming you're using this API function to fetch journals
import JournalCard from "./JournalCard.jsx";
import JournalEditor from "./JournalEditor.jsx";
import "./Journal.css"

const Journal = () => {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        // Fetch all journals when the component mounts
        const fetchJournals = async () => {
            const data = await getJournals();
            setJournals(data);
        };

        fetchJournals();
    }, []);

    return (
        <>
            {/* Journal Editor to write a new journal */}
            <JournalEditor />

            {/* Displaying the fetched journals */}
            <div id="journal-list-container">
                {journals.map((journal) => (
                    <Link key={journal.id} to={`/journal/${journal.id}`} className="journal-link">
                        <JournalCard
                            journalbanner={journal.journalbanner}
                            journaltitle={journal.title}  // Display the title
                            journalbody={journal.content}  // Display the content
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Journal;
