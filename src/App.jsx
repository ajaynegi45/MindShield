import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'
import {Link} from "react-router-dom";
import {TeamCard} from "./components/TeamCard.jsx";
import Cookies from "js-cookie";

function App() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Check for user login on component load
    useEffect(() => {
        const userCookie = Cookies.get('user');
        console.log(userCookie);

        if (userCookie) {
            const parsedUser = JSON.parse(userCookie); // Parse cookie value
            setUser(parsedUser); // Set the user data in the state
            navigate('/dashboard'); // Redirect to dashboard if user is logged in
        }
    }, [navigate]);

  return (
      <>
          {/* Grid Part */}
          <div id={"bgGrid"}>
              <div id={"blurGrid"}></div>
          </div>


          {/* ---Hero Section--- */}
          <section className={"mindshield-main"}>
                  <div className="mindshield-content">
                      <h1>Help when u need it, <br/>Hope when u want it</h1><br/>
                      <p>
                          A platform dedicated to your safety and mental well-being. Instantly notify loved ones in
                          emergencies with our SOS feature, reflect through secure journaling, and stay motivated with
                          uplifting affirmations.
                      </p><br/>

                      <Link to="/register">
                          <button className="register-button">Register</button>
                      </Link>
                  </div>

              <div className="mindshield-image">
                  {/*<img src="src/assets/img1.jpg" alt="Illustration" width="650" height="auto"/>*/}
                  <img src="handshake.jpeg" alt="Illustration" width="650" height="330"/>

              </div>
          </section>


          {/* ---Service Section--- */}
          <section className="services-container" id="services">
                  <div className="services-content">
                      <h2>Our services</h2>
                      <p>We provide to you the best things for you</p>
                      <div className="service-cards">

                          <div className="service-card1">
                              <img src="sos.jpg" alt="SOS Alert" width="250" height="250" />
                              <h3>SOS Alert</h3>
                              <p>An emergency feature to instantly notify your registered contacts via email or phone in
                                  critical situations.</p>
                          </div>

                          <div className="service-card2">
                              <img src="journalnew.png" alt="Journalling" width="300" height="250"
                                   className='journalimg'/>
                              <h3>Journalling</h3>
                              <p>A secure space to document your daily thoughts and feelings for self-reflection.</p>
                          </div>

                          <div className="service-card3">
                              <img src="mental.jpg" alt="Positive Affirmations" width="230" height="250"/>
                              <h3>Positive Affirmations</h3>
                              <p>A collection of motivational quotes to inspire positivity and boost your mental
                                  well-being every day.</p>
                          </div>

                      </div>
                  </div>
          </section>

          {/* ---Upcoming Chat Feature Section--- */}
          <section className="chat-feature-container" id="chat-feature">
              <div className="chat-feature-content">
                  <h2>Upcoming Chat Feature</h2>
                  <p>
                      Share your thoughts and problems with others to feel lighter and more relaxed.
                      Our upcoming chat feature is designed to help you connect, share, and support each other in times of need.
                      Stay tuned for updates!
                  </p>
                  <div className="chat-feature-image">
                      <img src="chat.svg" alt="Chat Feature" width="600" height="350" />
                  </div>
              </div>
          </section>


              <section className={"team-container"}>
                  <h1>Our Team</h1>
          <TeamCard/>
              </section>


      </>
  )
}

export default App
