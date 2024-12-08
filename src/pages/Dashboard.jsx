import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './dashboard.css';
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [shlok, setShlok] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        console.log(userCookie); // Debugging purpose: log the cookie content
        if (userCookie) {
            setUser(JSON.parse(userCookie)); // Parse and set the user data
        } else {
            navigate('/login'); // Redirect to login if no user is logged in
        }
    }, [navigate]);

    useEffect(() => {
        const fetchShlok = async () => {
            const API_URL = `http://localhost:8083/api/v1/shloks/get-random-shlok`;
            try {
                const response = await axios.get(API_URL);
                setShlok(response.data);
            } catch (error) {
                console.error("Error fetching the shlok:", error);
            }
        };
        fetchShlok();
    }, []);  // This effect runs only once, after the initial render

    return (
        <>
            {user ? (
                <div className={"welcome-container"}>
                    <h1>Welcome, <span>{user.name || 'User'}!</span></h1>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <section className="shlok-container">
                {/* Only render the Shlok content if it is available */}
                {shlok ? (
                    <Link to={`/shlok/${shlok.id}`} >
                    <p>{shlok.englishShlok}</p>
                    </Link>
                ) : (
                    <p>A person who remains unaffected by the material world, and is undisturbed by pain and pleasure, is a true yogi.</p>
                )}
            </section>

            <section className="sos-container">
                <Link to="/sos-alert">
                    <button className="sos-button">SOS ALERT</button>
                </Link>
            </section>

            <section className="other-sos-container">
                <h2>Emergency SOS Contacts in India</h2>
                <div className="emergency-container">
                    <div className="sos-card">
                        <h3>Police</h3>
                        <p>
                            Contact Number:
                            <a href="tel:100" className="call-link">100</a>
                        </p>
                    </div>
                    <div className="sos-card">
                        <h3>Ambulance</h3>
                        <p>
                            Contact Number:
                            <a href="tel:102" className="call-link">102</a>
                        </p>
                    </div>
                    <div className="sos-card">
                        <h3>Fire Brigade</h3>
                        <p>
                            Contact Number:
                            <a href="tel:101" className="call-link">101</a>
                        </p>
                    </div>
                    <div className="sos-card">
                        <h3>Women’s Helpline</h3>
                        <p>
                            Contact Number:
                            <a href="tel:1091" className="call-link">1091</a>
                        </p>
                    </div>
                    <div className="sos-card">
                        <h3>Disaster Management Helpline</h3>
                        <p>
                            Contact Number:
                            <a href="tel:108" className="call-link">108</a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
