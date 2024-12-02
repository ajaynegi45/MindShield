import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import './contact.css';
import Cookies from 'js-cookie';

const Contact = () => {
    // Hardcoded user ID
    // const userId = "user123";

    // Retrieve userId from cookies
    const userCookie = Cookies.get('user');
    const userId = userCookie ? JSON.parse(userCookie).userId : null;
    console.log(userId);

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contacts, setContacts] = useState({ emailAddresses: [], phoneNumbers: [] });

    // Fetch saved contacts when the component mounts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/sos/get-contacts/${userId}`);
                setContacts(response.data);  // Update contacts state
            } catch (error) {
                toast.error('Failed to fetch contact details. Please try again.');
            }
        };

        fetchContacts();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form input: At least one contact detail (email or phone) is required
        if (!email && !phoneNumber) {
            toast.error('At least one contact detail (email or phone) is required.');
            return;
        }

        // Prepare the payload for the API call, excluding empty fields
        const contactData = { userId };
        if (email) contactData.email = email;
        if (phoneNumber) contactData.phoneNumber = phoneNumber;

        try {
            // Show loading toast while saving
            toast.promise(
                axios.post('http://localhost:8080/api/sos/add-contacts', contactData),
                {
                    loading: 'Saving contact...',
                    success: (response) => response.data,  // Use the response message from backend
                    error: (error) => {
                        // Error handling based on the custom backend error structure
                        const errorDetails = error.response?.data;  // The response body is ErrorDetails
                        const errorMessage = errorDetails?.message || 'An error occurred. Please try again.';
                        return errorMessage;  // Return the error message to show in the toast
                    },
                }
            );

            // After successful addition, fetch updated contact list
            const response = await axios.get(`http://localhost:8080/api/sos/get-contacts/${userId}`);
            setContacts(response.data);  // Update contacts state after adding

            // Clear the input fields after successful submission
            setEmail('');
            setPhoneNumber('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            toast.error(errorMessage);  // Show error toast
        }
    };

    return (
        <div className="contact-container">
            <h2>Add Contact</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                {/* Email input */}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Phone Number input */}
                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-btn">Add Contact</button>
            </form>

            <h3>Saved Contacts</h3>
            <div className="contact-list">
                <div className="contact-details">
                    <h4>Email Addresses:</h4>
                    {contacts.emailAddresses.length > 0 ? (
                        <ul>
                            {contacts.emailAddresses.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No email addresses saved.</p>
                    )}
                </div>

                <div className="contact-details">
                    <h4>Phone Numbers:</h4>
                    {contacts.phoneNumbers.length > 0 ? (
                        <ul>
                            {contacts.phoneNumbers.map((phone, index) => (
                                <li key={index}>{phone}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No phone numbers saved.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
