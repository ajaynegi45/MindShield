import "./TeamCard.css";

export function TeamCard() {
    const teamMembers = [
        {
            quote:
                "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
            name: "Harinee",
            designation: "Developer",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
        },
        {
            quote:
                "Built a robust authentication system and real-time SOS alerts backend, seamlessly integrated with the frontend for a flawless user experience.",
            name: "Ajay Negi",
            designation: "Developer",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
        },
        {
            quote:
                "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
            name: "Yash Raj",
            designation: "Developer",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
        },
        {
            quote:
                "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
            name: "",
            designation: "Developer",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
        },
    ];

    return (
        <div className="team-card-container">
            {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                    <img src={member.src} alt={member.name} className="team-card-image" />
                    <h3 className="team-card-name">{member.name}</h3>
                    <p className="team-card-designation">{member.designation}</p>
                    <p className="team-card-quote">{member.quote}</p>
                </div>
            ))}
        </div>
    );
}
