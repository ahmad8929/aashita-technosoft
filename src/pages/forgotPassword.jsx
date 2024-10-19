import React, { useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState({ email: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let valid = true;
        const errors = { email: false };
        if (!formData.email) {
            errors.email = true;
            valid = false;
        }
        setError(errors);
        return valid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            console.log("Password reset email sent to:", formData.email);
            navigate("/login"); // Simulate navigation on successful password reset
        }, 2000);
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
            >
                {loading && <Spinner size="xl" position="absolute" top="50%" left="50%" />}
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Forgot Password
                </Heading>

                <VStack as="form" onSubmit={onSubmit} spacing={4} w="100%">
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

                    <Button
                        type="submit"
                        colorScheme="teal"
                        width="100%"
                        mt={4}
                        isLoading={loading}
                    >
                        Send Reset Link
                    </Button>
                </VStack>

                <Text textAlign="center" mt={4}>
                    Remember your password?{" "}
                    <ChakraLink as={Link} to="/login" color="blue.500" fontWeight="bold">
                        Log In
                    </ChakraLink>
                </Text>
            </Box>
        </Flex>
    );
};

export default ForgotPassword;
