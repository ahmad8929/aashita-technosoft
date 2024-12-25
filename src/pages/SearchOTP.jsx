// src/components/SearchOTP.jsx
import React, { useState, useEffect } from 'react';
import { ModalBody, ModalFooter, Button, Flex, Spinner, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SearchOTP = ({ onClose, formFields }) => {

    const [isLoading, setLoading] = useState(false);
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
                        'Session-Token': user.session_token,
                    },
                });
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error("Error fetching phone number:", error);
            }
        };

        fetchPhoneNumber();
    }, [user.sessionToken, toast]);

    const handleResendOtp = async () => {
        setLoading(true); // Set resending state
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-otp`, { phoneNumber }, {
                headers: {
                    'Session-Token': user.session_token,
                },
            });
            toast({
                title: "OTP Resent",
                description: "A new OTP has been sent to your registered email.",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            setOtp('');
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
            setLoading(false);
        }
    };


    // Verify OTP
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, { otp, phoneNumber, ...formFields }, {
                headers: {
                    'Session-Token': user.session_token,
                },
            });
            if (response.status === 200 || response.status === 201 || response.data.message === "Search request created") {
                setLoading(false);
                toast({
                    title: "OTP Verified",
                    description: "OTP verification successful! Email will be done shortly",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
                // onOtpVerified();
                console.log("strtdsahd")
                onClose();
                console.log("endddddddddd")
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Incorrect OTP") {
                setLoading(false);
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
                    title: "Expired OTP",
                    description: "Please generate a new OTP",
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

                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </>
    );
};

export default SearchOTP;
