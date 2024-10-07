import React, { useState, useEffect } from 'react';
import {
    Box, Text, VStack, Heading, Divider, Button, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Select,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Queries = () => {
    // State to hold token data
    const [tokens, setTokens] = useState({ dailyTokens: 0, remainingTokens: 0 });
    // State to hold query data
    const [queries, setQueries] = useState([]);
    // State to handle pagination and page size
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20); // Default page size to 20 queries per page

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
            // Example query data with dummy data for Name, Date, HS Code, and Country
            const response = Array.from({ length: 100 }, (_, index) => ({
                id: index + 1,
                name: `Name ${index + 1}`,
                date: `2024-10-${(index % 30) + 1}`,
                hsCode: `HS${(index % 1000)}`,
                country: 'IN',
            }));
            setQueries(response);
        };

        fetchQueryData();
    }, []);

    // Calculate current page queries based on pageSize
    const currentQueries = queries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle change in page size (number of queries per page)
    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value)); // Update pageSize based on selected value
        setCurrentPage(1); // Reset to the first page
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

                    {/* Page size selection dropdown */}
                    <Box mb={4} textAlign="right">
                        <Text display="inline-block" mr={2}>Queries per page:</Text>
                        <Select
                            width="auto"
                            display="inline-block"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </Select>
                    </Box>

                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        {currentQueries.length > 0 ? (
                            <TableContainer>
                                <Table variant="simple" size="md">
                                    <TableCaption placement="top">Recent Queries</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>S.No</Th>
                                            <Th>Name</Th>
                                            <Th>Date</Th>
                                            <Th>HS Code</Th>
                                            <Th>Country</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {currentQueries.map((query, index) => (
                                            <Tr key={query.id}>
                                                <Td>{(currentPage - 1) * pageSize + index + 1}</Td> {/* S.No based on pagination */}
                                                <Td>{query.name}</Td>
                                                <Td>{query.date}</Td>
                                                <Td>{query.hsCode}</Td>
                                                <Td>{query.country}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Text>No queries found</Text>
                        )}

                        {/* Pagination Controls */}
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

export default Queries;
