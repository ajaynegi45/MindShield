import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
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

    const handleLogout = () => {
        Cookies.remove('user'); // Remove the user cookie
        navigate('/'); // Redirect to the homepage
    };

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
                <p>Death is certain for one who has been born, and rebirth is inevitable for one who has died. Therefore, you should not lament over the inevitable</p>
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
