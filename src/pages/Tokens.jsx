import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Divider } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import axios from 'axios';

import AppPage from '../layouts/AppPage';

import { useSelector } from 'react-redux';

const Tokens = () => {
    const user = useSelector((state) => state.user);
    const [tokensData, setTokensData] = useState({
        totalTokens: 0,
        startTime: '',
        endTime: '',
        userId: ''
    });

    // Fetch token data from API
    useEffect(() => {
        const fetchTokenData = async () => {
            const sessionToken = user.sessionToken;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tokens`, {
                    headers: {
                        'Session-Token': sessionToken,
                    },
                });

                const { tokens, startTime, endTime, userId } = response.data;
                setTokensData({
                    totalTokens: tokens,
                    startTime: new Date(startTime).toLocaleString(),
                    endTime: new Date(endTime).toLocaleString(),
                    userId: userId,
                });
            } catch (error) {
                toast.error("Failed to fetch token data");
                console.error("Error fetching token data:", error);
            }
        };

        fetchTokenData();
    }, [user.sessionToken]);

    return (
        <AppPage title="Tokens" description="" keywords={[]} isProtected={true}>
            <Box p={8} bg="gray.100" minH="100vh">
                <VStack spacing={6} align="stretch" maxW="800px" mx="auto">
                    <Heading size="lg" textAlign="center">Todays Record</Heading>
                    <Divider />

                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="xl" mb={4}>Used Record for Today</Text>
                        <Text fontSize="2xl" fontWeight="bold">{5000 - tokensData.totalTokens}</Text>
                    </Box>
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="xl" mb={4}>Remaining Records</Text>
                        <Text fontSize="2xl" fontWeight="bold">{tokensData.totalTokens}</Text>
                    </Box>
                    {/* <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="xl" mb={4}>Start Time</Text>
                        <Text fontSize="2xl" fontWeight="bold">{tokensData.startTime}</Text>
                    </Box> */}
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="xl" mb={4}>Next Refresh</Text>
                        <Text fontSize="2xl" fontWeight="bold">{tokensData.endTime}</Text>
                    </Box>
                </VStack>
            </Box>
        </AppPage>
    );
};

export default Tokens;
