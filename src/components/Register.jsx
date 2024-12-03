import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from '../services/AuthService.jsx';
import {toast} from "sonner";

const RegisterForm = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    // Handle input changes
    const handleInputChange = (field, value) => {
        setData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const submitForm = (event) => {
        event.preventDefault();

        let validationErrors = {};
        let hasError = false;

        if (!data.name) {
            toast.error("Name is required");
            validationErrors.name = "Name is required";
            hasError = true;
        }
        if (!data.email) {
            toast.error("Email is required");
            validationErrors.email = "Email is required";
            hasError = true;
        }
        if (!data.password) {
            toast.error("Password is required");
            validationErrors.password = "Password is required";
            hasError = true;
        }
        if (data.password !== data.confirmPassword) {
            toast.error("Please make sure your passwords match");
            validationErrors.confirmPassword = "Please make sure your passwords match";
            hasError = true;
        }

        if (hasError) {
            setError({ errors: validationErrors, isError: true });
            console.log("Error: ", validationErrors);
            return;
        }

        // Call the register service and handle response
        register(data).then(() => {
            toast.success("Register Successfully");
            navigate("/login");
        }).catch((err) => {
            console.error("Error during registration: ", err);
        });
    };

    return (
        <div className="login-container">
            <h2>Create an account</h2>
            <p>Enter your details below to create your account</p>

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        // required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="eg@example.com"
                        // required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                        // required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Re-enter your password"
                        // required
                    />
                </div>

                <button type="submit" className="login-button">
                    Create account
                </button>
            </form>
            <p className="signup-text">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default RegisterForm;
