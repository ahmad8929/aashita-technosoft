import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    useToast
} from "@chakra-ui/react";
import AppPage from "../layouts/AppPage";
const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const toast = useToast();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [isLoading, setLoading] = useState(false);

    // Handle case where token is not available
    if (!token) {
        toast({
            title: "Invalid or expired token.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
        navigate("/login");  // Redirect to login or show error
        return null; // Prevent the form from rendering if token is missing
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reset-password?token=${token}`, {
                new_password: formData.newPassword,
            });
            toast({
                title: "Password reset successful.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to reset password.",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppPage title="Reset Password" isProtected={false} includeNavbar={false}>
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
                        Reset Password
                    </Heading>

                    <VStack as="form" onSubmit={handleResetPassword} spacing={4} w="100%">
                        <FormControl id="newPassword" isRequired>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                name="newPassword"
                                type="password"
                                placeholder="Enter your new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <Button type="submit" colorScheme="teal" width="100%" mt={4} isLoading={isLoading}>
                            Reset Password
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </AppPage>
    );
};

export default ResetPassword;
