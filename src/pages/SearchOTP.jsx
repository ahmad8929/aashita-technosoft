// src/components/SearchOTP.jsx
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { ModalBody, ModalFooter, Button, Flex, Spinner, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SearchOTP = ({ onClose, formFields }) => {

    const [isLoading, setLoading] = useState(false);
=======
import { ModalBody, ModalFooter, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SearchOTP = ({ onClose, onOtpVerified }) => {
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const toast = useToast();
    const user = useSelector((state) => state.user);
    const [isResending, setIsResending] = useState(false);

    // Fetch phone number from userInfo API
    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userInfo`, {
                    headers: {
<<<<<<< HEAD
                        'Session-Token': user.session_token,
=======
                        'Session-Token': user.sessionToken,
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                    },
                });
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
<<<<<<< HEAD
=======
                toast({
                    title: "Error fetching phone number",
                    description: "Failed to retrieve your phone number. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                console.error("Error fetching phone number:", error);
            }
        };

        fetchPhoneNumber();
    }, [user.sessionToken, toast]);

<<<<<<< HEAD
    const handleResendOtp = async () => {
        setLoading(true); // Set resending state
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-otp`, { phoneNumber }, {
                headers: {
                    'Session-Token': user.session_token,
=======
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

    // Add this function inside the component to handle OTP resend
    const handleResendOtp = async () => {
        setIsResending(true); // Set resending state
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-otp`, { phoneNumber }, {
                headers: {
                    'Session-Token': user.sessionToken,
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                },
            });
            toast({
                title: "OTP Resent",
<<<<<<< HEAD
                description: "A new OTP has been sent to your registered email.",
=======
                description: "A new OTP has been sent to your phone number.",
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
<<<<<<< HEAD
            setOtp('');
=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        } catch (error) {
            console.error("Error resending OTP:", error);
            toast({
                title: "Error Resending OTP",
                description: "Failed to resend OTP. Please try again.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
        } finally {
<<<<<<< HEAD
            setLoading(false);
=======
            setIsResending(false);
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        }
    };


    // Verify OTP
    const handleSubmit = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, { otp, phoneNumber, ...formFields }, {
                headers: {
                    'Session-Token': user.session_token,
                },
            });
            if (response.status === 200 || response.status === 201 || response.data.message === "Search request created") {
                setLoading(false);
=======

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify-otp`, { otp, phoneNumber }, {
                headers: {
                    'Session-Token': user.sessionToken,
                },
            });
            if (response.status === 200 && response.data.message === "OTP verified") {
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                toast({
                    title: "OTP Verified",
                    description: "OTP verification successful! Email will be done shortly",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
<<<<<<< HEAD
                // onOtpVerified();
                console.log("strtdsahd")
                onClose();
                console.log("endddddddddd")
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Incorrect OTP") {
                setLoading(false);
=======
                onOtpVerified();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Incorrect OTP") {
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
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
<<<<<<< HEAD
                    title: "Expired OTP",
                    description: "Please generate a new OTP",
=======
                    title: "Verification Failed",
                    description: "Failed to verify OTP. Please try again.",
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
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
<<<<<<< HEAD
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
=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
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
                <FormControl>
<<<<<<< HEAD
                    <Button
                        variant="link"
                        colorScheme="teal"
                        onClick={handleResendOtp}
                        // isLoading={isResending}
                        size="sm"
                        _hover={{ textDecoration: 'underline' }}
                        _focus={{ boxShadow: 'none' }}
                    >
                        Resend OTP
                    </Button>
                </FormControl>
            </ModalBody>
            <ModalFooter>

=======
                <Button
                    variant="link"
                    colorScheme="teal"
                    onClick={handleResendOtp}
                    isLoading={isResending}
                    size="sm"
                    _hover={{ textDecoration: 'underline' }}
                    _focus={{ boxShadow: 'none' }}
                >
                    Resend OTP
                </Button>
            </FormControl>
            </ModalBody>
            <ModalFooter>
               
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </>
    );
};

export default SearchOTP;
