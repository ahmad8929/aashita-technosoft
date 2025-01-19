import { useState, useEffect } from "react";
import axios from 'axios';
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
    useToast,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AppPage from "../layouts/AppPage";
import { setUser, setAuthState } from "../redux/slices/user";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: false, password: false });
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const user = useSelector((state) => state.user);

    console.log("User data", user);
    useEffect(() => {
        if (isLoggedIn) {
            console.log("Redirecting to Home Page...");
            window.location.href = '/';
        }
    }, [isLoggedIn]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData);
            console.log({ response })
            const { session_token, session_expiration_time, user_id, user_details, license } = response.data;


            if (!response.data) {
                console.error(error);
                return;
            }
            console.log("API Response Data:", response);
            console.log("API Response Data:", response.data);
            if (!session_token || !session_expiration_time) {
                console.error("Invalid response data:", response.data);
                return;
            }

            dispatch(setUser({
                session_token,
                session_exp_time: session_expiration_time,
                user_id,
                name: user_details.Name,
                licenseType: user_details.LicenseType,
                isBuyersNonConfidential: license.IsBuyersNonConfidential,
            }));
            dispatch(setAuthState(true));

            window.localStorage.setItem('session', JSON.stringify(response.data));

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast({
                    title: "Invalid Login",
                    description: "Invalid email or password. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            } else {
                console.error("Login API Error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppPage title="Login" isProtected={false} includeNavbar={false}>
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
                    {isLoading && (
                        <Flex
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            alignItems="center"
                            justifyContent="center"
                            bg="rgba(255, 255, 255, 0.7)"
                            zIndex="10"
                        >
                            <Spinner size="xl" />
                        </Flex>
                    )}

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

                        <Button type="submit" colorScheme="teal" width="100%" mt={4} isLoading={isLoading}>
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
        </AppPage>
    );
};

export default Login;
