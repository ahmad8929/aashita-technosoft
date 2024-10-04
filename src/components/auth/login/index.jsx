import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, Flex, VStack } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setAuthState } from '../../redux/slices/index';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleFormInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const { data: loginResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData);

            const token = loginResponse.token;
            localStorage.setItem('sessionToken', token);
            toast.success("User logged in successfully!");
            dispatch(setAuthState(true));
            navigate("/landing");
        } catch (error) {
            toast.error("Failed to login.");
        }
    };

    return (
        <Flex minH="100vh" justify="center" align="center" bg="gray.50">
            <Box p={8} maxWidth="400px" w="100%" bg="white" boxShadow="lg" borderRadius="8px">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>Log In</Text>
                <VStack spacing={4}>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" type="email" onChange={handleFormInput} placeholder="Email" />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input name="password" type="password" onChange={handleFormInput} placeholder="Password" />
                    </FormControl>
                    <Button colorScheme="blue" w="100%" onClick={handleLogin}>Log In</Button>
                    <Flex w="100%" justify="space-between" mt={2}>
                        <Button variant="link" colorScheme="blue" onClick={() => navigate('/forgot')}>Forgot Password?</Button>
                        <Button variant="link" colorScheme="blue" onClick={() => navigate('/register')}>Create an Account</Button>
                    </Flex>
                </VStack>
            </Box>
        </Flex>
    );
};

export default Login;
