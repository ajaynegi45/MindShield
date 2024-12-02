import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login } from '../services/AuthService.jsx';
import { toast } from 'sonner';
import './login.css';

const LoginForm = () => {
    const navigate = useNavigate();

    // State for form inputs
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    // Track focus for inputs
    const [focused, setFocused] = useState({
        email: false,
        password: false,
    });

    // Handle input changes
    const handleInputChange = (field, value) => {
        setData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    // Handle focus and blur for inputs
    const handleFocus = (field) => {
        setFocused((prevState) => ({ ...prevState, [field]: true }));
    };

    const handleBlur = (field) => {
        setFocused((prevState) => ({ ...prevState, [field]: false }));
    };

    // Handle form submission
    const handleLogin = (e) => {
        e.preventDefault();

        if (data.email !== '' && data.password !== '') {
            login(data)
                .then((resp) => {
                    const user = {
                        userId: resp.userId,
                        name: resp.name,
                        email: resp.email,
                    };
                    Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true });
                    toast.success('User logged in successfully');
                    navigate('/dashboard');
                })
                .catch((err) => {
                    console.error('Error during login:', err);
                    toast.error('Invalid credentials. Please try again.');
                });
        } else {
            toast.error('Please fill in all the fields.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Your Account</h2>
            <p>Enter your email and password below to login to your account</p>
            <form onSubmit={handleLogin}>
                {/* Email Input */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="eg@example.com"
                        value={data.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        className={focused.email ? 'input-focused' : ''}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                        className={focused.password ? 'input-focused' : ''}
                        required
                    />
                </div>

                {/* Login Button */}
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>

            {/* Sign Up Link */}
            <p className="signup-text">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginForm;
