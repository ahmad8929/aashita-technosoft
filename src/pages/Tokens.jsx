import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Divider, SimpleGrid, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Tokens = () => {
    // State to hold token data
    const [tokens, setTokens] = useState({ dailyTokens: 0, remainingTokens: 0 });
    // State to hold query data
    const [queries, setQueries] = useState([]);
    // State to handle pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    // Simulate fetching token data from an API
    useEffect(() => {
        const fetchTokenData = async () => {
            const response = {
                dailyTokens: 100, // Example daily token allocation
                remainingTokens: 30 // Example remaining tokens for the current day
            };
            setTokens(response);
        };

        fetchTokenData();
    }, []);

    // Simulate fetching query data from an API
    useEffect(() => {
        const fetchQueryData = async () => {
            // Example query data
            const response = Array.from({ length: 100 }, (_, index) => ({
                id: index + 1,
                text: `Query number ${index + 1}`
            }));
            setQueries(response);
        };

        fetchQueryData();
    }, []);

    // Calculate current page queries
    const currentQueries = queries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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

                    <Heading size="lg" textAlign="center">Recent Queries</Heading>
                    <Divider />
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        {currentQueries.length > 0 ? (
                            <SimpleGrid columns={1} spacing={4}>
                                {currentQueries.map(query => (
                                    <Box key={query.id} p={4} borderWidth="1px" borderRadius="md" shadow="sm">
                                        <Text>{query.text}</Text>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Text>No queries found</Text>
                        )}
                        <Box mt={4} textAlign="center">
                            <Button
                                onClick={() => handlePageChange(currentPage - 1)}
                                isDisabled={currentPage === 1}
                                mr={2}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => handlePageChange(currentPage + 1)}
                                isDisabled={currentPage * pageSize >= queries.length}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </VStack>
            </Box>
        </>
    );
};

export default Tokens;
