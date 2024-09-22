// src/Components/SignUpLogin/SignUpLogin.jsx

import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './SignUpLogin.css';

import {
    Flex,
    Link as ChakraLink,
} from "@chakra-ui/react";

import { useDispatch } from 'react-redux';
import { setAuthState } from '../../redux/slices/index'

import { useNavigate, Link } from 'react-router-dom';


import logImage from '../../assets/log.png';
import registerImage from '../../assets/register.png';


const SignUpLogin = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const postSubmit = () => {
        dispatch(setAuthState(true))

        navigate("/landing")
    }

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    useEffect(() => {
        const signInBtn = document.querySelector("#sign-in-btn");
        const signUpBtn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        signUpBtn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        signInBtn.addEventListener("click", () => {
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
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="button-container">
                            <input
                                type="button"
                                onClick={postSubmit}
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
                            <input type="text" placeholder="Name" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-phone"></i>
                            <input type="number" placeholder="Mobile No." />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>

                        <input type="button" onClick={postSubmit} className="btn" value="Sign up" />
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
                            It&rsquo;s great to see you again at Aashita Technosoft.
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


