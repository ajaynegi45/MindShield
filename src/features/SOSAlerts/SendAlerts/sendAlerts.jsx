import { toast } from "sonner";
import axios from "axios";
import "./SendAlerts.css";
import Cookies from 'js-cookie';

const SendAlerts = () => {
    // Function to handle getting user's location
    const getLocationAndSendAlert = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const location = `${latitude}, ${longitude}`;

                    // Function to call the backend to send the alert
                    sendSOSAlert(location);
                },
                (error) => {
                    console.error("Error getting location", error);
                    toast.error("Failed to get your location.");
                }
            );
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    };

    // Function to send SOS alert to the backend using Axios
    const sendSOSAlert = (location) => {

        // Replace with actual userId from cookies or context
        // const userId = "user123";

        // Retrieve userId from cookies
        const userCookie = Cookies.get('user');
        const userId = userCookie ? JSON.parse(userCookie).userId : null;
        console.log(userId);

        toast.promise(
            axios.post(`http://localhost:8080/api/sos/alert`, null, {
                params: {
                    userId,
                    location,
                },
            })
                .then((response) => {
                    // Success case: Log response data, return message
                    console.log("This is backend response", response.data);
                    return response.data.message || "SOS alert sent successfully!";
                })
                .catch((error) => {
                    // Handle error from backend
                    const errorMessage = error.response?.data?.message || "Error sending SOS alert.";
                    const errorDetails = error.response?.data?.details || "No additional details available.";
                    throw new Error(`${errorMessage}: ${errorDetails}`);
                }),

            {
                loading: "Sending SOS alert...",
                success: (data) => data, // Show success message from backend
                error: (error) => error.message || "Error sending SOS alert.", // Show error message
            }
        );
    };

    return (
        <>
            <div className="sendAlerts">
                <h1>Send SOS Alert to saved contacts</h1>
                <button onClick={getLocationAndSendAlert} className="sos-button">
                    Tap to send Alert
                </button>
            </div>
        </>
    );
};

export default SendAlerts;