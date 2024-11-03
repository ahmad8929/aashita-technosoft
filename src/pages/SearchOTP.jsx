// src/components/SearchOTP.jsx
import React, { useState, useEffect } from 'react';
import { ModalBody, ModalFooter, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';

const SearchOTP = ({ onClose }) => {
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const toast = useToast();
    const phoneNumber = "8929691406"; // Replace with the actual phone number where OTP should be sent

    // Generate a random 6-digit OTP
    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    // Send OTP when component mounts
    useEffect(() => {
        const otp = generateOtp();
        setGeneratedOtp(otp);

        const sendOtp = async () => {
            try {
                const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
                    sender_id: "FSTSMS",
                    message: `Your OTP is: ${otp}`,
                    language: "english",
                    route: "p",
                    numbers: phoneNumber,
                }, {
                    headers: {
                        'authorization': "JtMx8qu4kZQX5T3oVdB2RzHFab16jmeyfLwcnKsI9NDgY7PAU0qhUwQ125JiuFP8IENYypezGT3mH6v7",
                        'Content-Type': 'application/json' // Add Content-Type header
                    }
                });
                
                // Check if the response indicates success
                if (response.data.return) {
                    toast({
                        title: "OTP Sent",
                        description: "An OTP has been sent to your phone number.",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top"
                    });
                } else {
                    throw new Error('Failed to send OTP');
                }
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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (otp === String(generatedOtp)) {
            // Proceed to call your backend search API here
            console.log('OTP is valid. Proceeding to search API...');
            // Here you would add your logic to call the search API
            
            // Close the modal after successful OTP verification
            onClose();
        } else {
            toast({
                title: "Invalid OTP",
                description: "The OTP you entered is incorrect.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
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
