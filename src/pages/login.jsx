import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AppPage from "../layouts/AppPage";

import { setUser, setAuthState } from "../redux/slices/user";

const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [handleLogin, { isLoading }] = useLoginMutation();
    const [isLoading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Error and loading state
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

    const handleLoginClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: responseData } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                ...formData,
            });

            console.log({ responseData })

            if (!responseData) {
                console.error(error);
                return;
            }

            window.localStorage.setItem('session', JSON.stringify(responseData));

            dispatch(setUser(responseData));
            dispatch(setAuthState(true));

            navigate("/");
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
                console.error(error);
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
                    {/* {isLoading && <Spinner size="xl" position="absolute" top="50%" left="50%" />} */}

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

                    <VStack as="form" onSubmit={handleLoginClick} spacing={4} w="100%">
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
