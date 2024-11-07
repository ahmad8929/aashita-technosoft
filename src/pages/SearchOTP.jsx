// src/components/SearchOTP.jsx
import React, { useState, useEffect } from 'react';
import { ModalBody, ModalFooter, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SearchOTP = ({ onClose }) => {
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const toast = useToast();
    const user = useSelector((state) => state.user);

    // Fetch phone number from userInfo API
    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userInfo`, {
                    headers: {
                        'Session-Token': user.sessionToken,
                    },
                });
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                toast({
                    title: "Error fetching phone number",
                    description: "Failed to retrieve your phone number. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
                console.error("Error fetching phone number:", error);
            }
        };

        fetchPhoneNumber();
    }, [user.sessionToken, toast]);

    // Send OTP request to the backend
    useEffect(() => {
        const sendOtp = async () => {
            // if (!phoneNumber) return;

            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-otp`, { phoneNumber }, {
                    headers: {
                        'Session-Token': user.sessionToken,
                    },
                });
                toast({
                    title: "OTP Sent",
                    description: "An OTP has been sent to your phone number.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
            } catch (error) {
                console.error("Error sending OTP:", error);
                toast({
                    title: "Error Sending OTP",
                    description: "Failed to send OTP. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
            }
        };

        sendOtp();
    }, [phoneNumber, toast]);

    // Verify OTP
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify-otp`, { otp, phoneNumber }, {
                headers: {
                    'Session-Token': user.sessionToken,
                },
            });
            if (response.status === 200 && response.data.message === "OTP verified") {
                toast({
                    title: "OTP Verified",
                    description: "OTP verification successful! Email will be done shortly",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Incorrect OTP") {
                toast({
                    title: "Incorrect OTP",
                    description: "OTP didn't match. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
            } else {
                toast({
                    title: "Verification Failed",
                    description: "Failed to verify OTP. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
            }
            console.error("Error verifying OTP:", error);
        }
    };
    

    return (
        <>
            <ModalBody>
                <FormControl>
                    <FormLabel fontSize="sm" fontWeight="medium">Enter OTP</FormLabel>
                    <Input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                    />
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </>
    );
};

export default SearchOTP;
