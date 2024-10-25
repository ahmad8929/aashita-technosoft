import React, { useState, useEffect } from 'react';
import {
    Box, Text, VStack, Heading, Divider, Button, Thead, Tbody, Tr, Th, Td, Select, Table, Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppPage from '../layouts/AppPage';
import { useSelector } from 'react-redux';

const Queries = () => {
    const user = useSelector((state) => state.user);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        const fetchQueryData = async () => {
            const sessionToken = user.sessionToken;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests`, {
                    headers: {
                        'Session-Token': sessionToken,
                    },
                });

                const queriesData = response.data.data; // Assuming data contains the array of queries
                setQueries(queriesData);

            } catch (error) {
                toast.error("Failed to fetch queries");
                setError("Could not load queries");
            } finally {
                setLoading(false);
            }
        };

        fetchQueryData();
    }, [user.sessionToken]);

    // Slice queries for pagination
    const currentQueries = queries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(1);
    };

    return (
        <AppPage title="Queries" description="" keywords={[]} isProtected={true}>
            <Box p={8} bg="gray.100" minH="100vh">
                <VStack spacing={6} align="stretch" maxW="1200px" mx="auto">
                    <Heading size="lg" textAlign="center">Recent Queries</Heading>
                    <Divider />

                    {loading ? (
                        <Box textAlign="center" mt={10}>
                            <Spinner size="xl" />
                            <Text>Loading queries...</Text>
                        </Box>
                    ) : error ? (
                        <Text color="red.500" textAlign="center">{error}</Text>
                    ) : (
                        <>
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

                            <Box bg="white" p={6} borderRadius="md" shadow="md" minH="400px">
                                <Table variant="simple" width="100%">
                                    <Thead>
                                        <Tr>
                                            <Th>Created Time</Th>
                                            {/* <Th>Date From-To</Th> */}
                                            <Th width="150px">Date From-To</Th>
                                            <Th>Import/Export</Th>
                                            <Th>Buyer Name</Th>
                                            <Th>Supplier Name</Th>
                                            <Th>HS Code</Th>
                                            <Th>Country</Th>
                                            <Th>No. of Records</Th>
                                            <Th>Product Description</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {currentQueries.map((query, index) => {
                                            // Parse the RequestParamsJson string to JSON
                                            let params = {};
                                            try {
                                                params = JSON.parse(query.RequestParamsJson);
                                            } catch (e) {
                                                console.error("Error parsing JSON:", e);
                                            }

                                            return (
                                                <Tr key={index}>
                                                    <Td>{new Date(query.CreatedTime).toLocaleString()}</Td>
                                                    {/* <Td>{params.from_date} - {params.to_date}</Td> */}

                                                    <Td width="150px">{params.from_date} - {params.to_date}</Td>
                                                    <Td>{params.is_export ? "Export" : "Import"}</Td>
                                                    <Td>{params.buyer_name || "--"}</Td>
                                                    <Td>{params.supplier_name || "--"}</Td>
                                                    <Td>{params.hs_code || "--"}</Td>
                                                    <Td>{params.country || "--"}</Td>
                                                    <Td>{params.number_of_records || "--"}</Td>
                                                    <Td>{params.pro_desc || "--"}</Td>
                                                </Tr>
                                            );
                                        })}
                                    </Tbody>
                                </Table>

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
                        </>
                    )}
                </VStack>
            </Box>
        </AppPage>
    );
};

export default Queries;
