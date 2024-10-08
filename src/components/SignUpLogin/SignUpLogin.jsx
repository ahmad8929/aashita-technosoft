import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import './SignUpLogin.css';
import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { setAuthState } from '../../redux/slices/index';
import { useNavigate, Link } from 'react-router-dom';
import logImage from '../../assets/log.png';
import registerImage from '../../assets/register.png';

const SignUpLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        phoneNumber: '',
        licenseType: ''
    });

    const handleFormInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {
        try {
            const { data: createAccountResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
                phoneNumber: formData.phoneNumber,
                licenseType: formData.licenseType
            });

            toast.success("Account created successfully!");
            handleLogin(); // Automatically log in after registration
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Email already exists");
            } else {
                toast.error(error?.message || "Failed to create account");
            }
        }
    };

    const handleLogin = async () => {
        try {
            const { data: loginResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email: formData.email,
                password: formData.password,
            });



            const token = loginResponse.sessionToken; // Assuming the token is in the response
            localStorage.setItem('sessionToken', token); // Store the token
            toast.success("User logged in successfully!");

            dispatch(setAuthState(true));
            navigate("/landing"); // Redirect to landing page
        } catch (error) {
            console.error("Login error:", error.response || error.message);
            if (error.response && error.response.status === 500) {
                toast.error("Server error, please try again later.");
            } else if (error.response && error.response.status === 401) {
                toast.error("Invalid email or password.");
            } else {
                toast.error("Failed to login.");
            }
        }
    };

    // const handleLogin = async () => {
    //     try {
    //         console.log("Starting login process...");

    //         const dataLogin = JSON.stringify({
    //             email: formData.email,
    //             password: formData.password,
    //         });

    //         // Making the login request using fetch
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: dataLogin,
    //         });

    //         // Checking if the response was successful
    //         if (!response.ok) {
    //             console.error("Failed to login:", response.statusText);
    //             if (response.status === 500) {
    //                 toast.error("Server error, please try again later.");
    //             } else if (response.status === 401) {
    //                 toast.error("Invalid email or password.");
    //             } else {
    //                 toast.error("Failed to login.");
    //             }
    //             return;
    //         }

    //         // Parsing the response data
    //         const data = await response.json();
    //         console.log("Login response data:", data);

    //         // Logging headers to inspect them
    //         console.log("Response headers:", response.headers);

    //         console.log("data:", data);

    //         console.log(response.headers.get('user_id'));

    //         // Accessing the token from headers (e.g., Authorization)
    //         const token = response.headers.get('Authorization') || response.headers.get('session_token');

    //         if (token) {
    //             console.log("Session token:", token);

    //             // Storing the token in localStorage
    //             localStorage.setItem('sessionToken', token);
    //             toast.success("User logged in successfully!");

    //             // Set auth state and navigate to landing page
    //             dispatch(setAuthState(true));
    //             navigate("/landing");
    //         } else {
    //             console.error("Token not found in headers.");
    //             toast.error("Failed to retrieve session token.");
    //         }

    //     } catch (error) {
    //         console.error("Login error:", error.message || error);
    //         toast.error("An error occurred during login.");
    //     }
    // };



    useEffect(() => {
        const signInBtn = document.querySelector("#sign-in-btn");
        const signUpBtn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        signUpBtn.addEventListener("click", () => {
            setFormData({
                email: '',
                password: '',
                companyName: '',
                phoneNumber: '',
                licenseType: ''
            });
            container.classList.add("sign-up-mode");
        });

        signInBtn.addEventListener("click", () => {
            setFormData({
                email: '',
                password: '',
                companyName: '',
                phoneNumber: '',
                licenseType: ''
            });
            container.classList.remove("sign-up-mode");
        });

        return () => {
            signInBtn.removeEventListener("click", () => { });
            signUpBtn.removeEventListener("click", () => { });
        };
    }, []);

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" name="email" onChange={handleFormInput} placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" onChange={handleFormInput} placeholder="Password" />
                        </div>
                        <div className="button-container">
                            <input
                                type="button"
                                onClick={handleLogin}
                                value="Login"
                                className="btn solid login-btn"
                            />
                            <Flex w="100%" justify="flex-end">
                                <ChakraLink
                                    as={Link}
                                    to="/forgot"
                                    className="forgot-password-link"
                                    color="blue.500"
                                    fontSize="sm"
                                >
                                    Forgot Password?
                                </ChakraLink>
                            </Flex>
                        </div>
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>

                    <form className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="name" name="companyName" onChange={handleFormInput} placeholder="Company Name" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-phone"></i>
                            <input type="number" name="phoneNumber" onChange={handleFormInput} placeholder="Mobile No." />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" name="email" onChange={handleFormInput} placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" onChange={handleFormInput} placeholder="Password" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <select name="licenseType" onChange={handleFormInput} defaultValue="">
                                <option value="" disabled>
                                    Choose License
                                </option>
                                <option value="diamond">Diamond</option>
                                <option value="premium">Premium</option>
                                <option value="silver">Silver</option>
                            </select>
                        </div>

                        <input type="button" onClick={handleRegister} className="btn" value="Sign up" />
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Join Us Today!</h3>
                        <p>
                            Welcome to Aashita Technosoft!
                        </p>
                        <button className="btn transparent" id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src={logImage} className="image" alt="Log" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Welcome Back!</h3>
                        <p>
                            It’s great to see you again at Aashita Technosoft.
                        </p>
                        <button className="btn transparent" id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src={registerImage} className="image" alt="Register" />
                </div>
            </div>
        </div>
    );
};

export default SignUpLogin;
