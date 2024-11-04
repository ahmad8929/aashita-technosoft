// src/components/SearchOTP.jsx
import React, { useState, useEffect } from 'react';
import { ModalBody, ModalFooter, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';

const SearchOTP = ({ onClose }) => {
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const toast = useToast();

    // Fetch the user's phone number from /userinfo API
    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const response = await axios.get('/userinfo');
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error("Error fetching user info:", error);
                toast({
                    title: "Error Fetching User Info",
                    description: "Could not retrieve phone number.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
            }
        };

        fetchPhoneNumber();
    }, [toast]);

    // Send OTP request to the backend
    useEffect(() => {
        const sendOtp = async () => {
            try {
                await axios.post('/searchOTP', { phoneNumber });
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

        if (phoneNumber) sendOtp();
    }, [phoneNumber, toast]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Process submission to the backend for OTP verification (assumed backend handles this logic)
        console.log('Submitting OTP:', otp);
        onClose();
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
