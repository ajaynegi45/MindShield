import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./EditProfile.css";
import {toast} from "sonner";

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
            setName(userData.name);
            setEmail(userData.email);
            setProfileImage(userData.profileImage || "");
        } else {
            navigate("/login");
        }
    }, [navigate]);



    const handleUpdateProfile = async () => {
        try {
            const userId = user.userId;
            console.log(userId);
            const response = await fetch("http://localhost:8080/api/auth/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, name, email, password, profileImage }),
            });
            if (response.ok) {
                toast.success("Profile updated!");
                const updatedUser = await response.json();
                Cookies.set("user", JSON.stringify(updatedUser));
                navigate("/profile");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section className="edit-profile">
            <div className="edit-profile-container">
                <h1>Edit Profile</h1>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Profile Image URL"*/}
                {/*    value={profileImage}*/}
                {/*    onChange={(e) => setProfileImage(e.target.value)}*/}
                {/*/>*/}
                <button className="update-button" onClick={handleUpdateProfile}>
                    Update Profile
                </button>
            </div>
        </section>
    );
};

export default EditProfile;
