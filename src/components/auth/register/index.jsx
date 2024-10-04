import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Text, Flex, VStack } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setAuthState } from '../../redux/slices/index';

const Register = () => {
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
      const { data: createAccountResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData);

      toast.success("Account created successfully!");
      handleLogin(); // Automatically log in after registration
    } catch (error) {
      if (error.response?.status === 400) {
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
      <Box p={8} maxWidth="500px" w="100%" bg="white" boxShadow="lg" borderRadius="8px">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>Register</Text>
        <VStack spacing={4}>
          <FormControl id="companyName" isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input name="companyName" onChange={handleFormInput} placeholder="Company Name" />
          </FormControl>
          <FormControl id="phoneNumber" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input name="phoneNumber" type="tel" onChange={handleFormInput} placeholder="Phone Number" />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" onChange={handleFormInput} placeholder="Email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" onChange={handleFormInput} placeholder="Password" />
          </FormControl>
          <FormControl id="licenseType" isRequired>
            <FormLabel>License Type</FormLabel>
            <Select name="licenseType" onChange={handleFormInput} placeholder="Select License">
              <option value="diamond">Diamond</option>
              <option value="premium">Premium</option>
              <option value="silver">Silver</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" w="100%" onClick={handleRegister}>Sign Up</Button>
          <Text textAlign="center">Already have an account? <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>Log in</Button></Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;
