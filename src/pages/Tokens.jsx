import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Divider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const Tokens = () => {
    // State to hold token data
    const [tokens, setTokens] = useState({ dailyTokens: 0, remainingTokens: 0 });

    // Fetch token data from API
    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tokens`);
                setTokens(response.data);
            } catch (error) {
                toast.error("Failed to fetch token data");
                console.error("Error fetching token data:", error);
            }
        };

        fetchTokenData();
    }, []);

    return (
        <>
            <Navbar />
            <Box p={8} bg="gray.100" minH="100vh">
                <VStack spacing={6} align="stretch" maxW="800px" mx="auto">
                    <Heading size="lg" textAlign="center">Your Tokens</Heading>
                    <Divider />
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="xl" mb={4}>Tokens Per Day</Text>
                        <Text fontSize="2xl" fontWeight="bold">{tokens.dailyTokens}</Text>
                    </Box>
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="xl" mb={4}>Remaining Tokens Today</Text>
                        <Text fontSize="2xl" fontWeight="bold">{tokens.remainingTokens}</Text>
                    </Box>
                </VStack>
            </Box>
        </>
    );
};

export default Tokens;
