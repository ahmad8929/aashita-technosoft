import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Input,
    Heading,
    Text,
    FormControl,
    FormLabel,
    VStack,
    Spinner,
    Flex,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { setAuthState } from "../../redux/slices/index";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Error and loading state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        email: false,
        password: false,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {
            email: formData.email === "",
            password: formData.password === "",
        };
        setError(errors);
        return !errors.email && !errors.password;
    };

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     if (!validateForm()) {
    //         toast.error("Please fill in all fields");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         const { data: loginResponse } = await axios.post(
    //             `${import.meta.env.VITE_BACKEND_URL}/login`,
    //             {
    //                 email: formData.email,
    //                 password: formData.password,
    //             }
    //         );

    //         const token = loginResponse.sessionToken;
    //         localStorage.setItem("sessionToken", token);

    //         toast.success("User logged in successfully!");
    //         dispatch(setAuthState(true));
    //         navigate("/landing");
    //     } catch (error) {
    //         console.error("Login error:", error.response || error.message);
    //         if (error.response && error.response.status === 401) {
    //             toast.error("Invalid email or password.");
    //         } else if (error.response && error.response.status === 500) {
    //             toast.error("Server error, please try again later.");
    //         } else {
    //             toast.error("Failed to login.");
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Step 1: Validate the form inputs
        if (!validateForm()) {
            toast.error("Please fill in all fields");
            console.log("Form validation failed."); // Logging validation failure
            return;
        }

        setLoading(true);
        console.log("Starting login process..."); // Logging the start of the login process

        try {
            // Step 2: Make the login request
            const { data: loginResponse, headers } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/login`,
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            console.log("Full login response:", loginResponse);

            console.log("Response headers:", headers);

            // Step 3: Retrieve the token from headers
            const token = headers['session_token'] || loginResponse.session_token; // Check headers for token
            console.log("Token retrieved:", token); // Logging the retrieved token

            // Step 4: Store the token in local storage
            if (token) {
                localStorage.setItem("sessionToken", token);
                console.log("Token stored in local storage."); // Logging successful storage
            } else {
                console.error("No token received from server."); // Logging if token is missing
                toast.error("Failed to retrieve session token.");
                return; // Early exit if no token is found
            }

            // Step 5: Notify success and update authentication state
            toast.success("User logged in successfully!");
            dispatch(setAuthState(true));
            navigate("/landing");
            console.log("User redirected to landing page."); // Logging successful navigation
        } catch (error) {
            // Step 6: Handle different types of errors
            console.error("Login error:", error.response || error.message); // Logging the error response

            if (error.response && error.response.status === 401) {
                toast.error("Invalid email or password.");
                console.log("Invalid email or password error."); // Logging specific error
            } else if (error.response && error.response.status === 500) {
                toast.error("Server error, please try again later.");
                console.log("Server error, status 500."); // Logging server error
            } else {
                toast.error("Failed to login.");
                console.log("General login failure."); // Logging general failure
            }
        } finally {
            setLoading(false);
            console.log("Login process completed."); // Logging completion of the process
        }
    };


    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Box
                w="100%"
                maxW="500px"
                p="6"
                boxShadow="lg"
                border="2px"
                borderColor="gray.200"
                borderRadius="8px"
                position="relative"
            >
                {loading && <Spinner size="xl" position="absolute" top="50%" left="50%" />}

                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    LOG IN
                </Heading>

                <VStack as="form" onSubmit={handleLogin} spacing={4} w="100%">
                    <FormControl id="email" isRequired isInvalid={error.email}>
                        <FormLabel>Email ID</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {error.email && (
                            <Text color="red.500" fontSize="sm">
                                Email is required
                            </Text>
                        )}
                    </FormControl>

                    <FormControl id="password" isRequired isInvalid={error.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {error.password && (
                            <Text color="red.500" fontSize="sm">
                                Password is required
                            </Text>
                        )}
                    </FormControl>

                    <Flex w="100%" justify="flex-end">
                        <ChakraLink as={Link} to="/forgot-password" color="blue.500" fontSize="sm">
                            Forgot Password?
                        </ChakraLink>
                    </Flex>

                    <Button type="submit" colorScheme="teal" width="100%" mt={4} isLoading={loading}>
                        Log In
                    </Button>
                </VStack>

                <Text textAlign="center" mt={4}>
                    Don&apos;t have an account?{" "}
                    <ChakraLink as={Link} to="/signup" color="blue.500" fontWeight="bold">
                        Register
                    </ChakraLink>
                </Text>
            </Box>
        </Flex>
    );
};

export default Login;
