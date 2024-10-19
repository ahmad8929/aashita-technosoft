import React, { useState, useEffect } from 'react';
import {
    Box, Text, VStack, Heading, Divider, Button, Thead, Tbody, Tr, Th, Td, Select, Table,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppPage from '../layouts/AppPage';

const Queries = () => {
    // State to hold query data
    const [queries, setQueries] = useState([]);
    // State to handle pagination and page size
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20); // Default page size to 20 queries per page

    // Fetch query data from API
    useEffect(() => {
        const fetchQueryData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/queries`);
                setQueries(response.data);
            } catch (error) {
                toast.error("Failed to fetch queries");
                console.error("Error fetching queries:", error);
            }
        };

        fetchQueryData();
    }, []);

    // Hardcoded data in case no queries are returned from the backend
    const hardcodedData = [
        {
            id: 1,
            createdTime: '2024-10-05 10:30',
            dateFrom: '2024-09-01',
            dateTo: '2024-09-30',
            importExport: 'Import',
            buyerName: 'ABC Corp',
            supplierName: 'XYZ Ltd',
            hsCode: '123456',
            countryCode: 'IN',
        },
        {
            id: 2,
            createdTime: '2024-10-06 18:25',
            dateFrom: '2024-09-01',
            dateTo: '2024-09-30',
            importExport: 'Export',
            buyerName: 'DEF Inc',
            supplierName: 'PQR Ltd',
            hsCode: '654321',
            countryCode: 'US',
        },
        {
            id: 3,
            createdTime: '2024-10-07 13:45',
            dateFrom: '2024-09-01',
            dateTo: '2024-09-30',
            importExport: 'Import',
            buyerName: 'GHI Pvt',
            supplierName: 'LMN Ltd',
            hsCode: '789012',
            countryCode: 'CA',
        },
    ];

    // Fallback to hardcoded data if no queries are returned from the backend
    const displayQueries = queries.length > 0 ? queries : hardcodedData;

    // Calculate current page queries based on pageSize
    const currentQueries = displayQueries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
        <AppPage title="Queries" description="" keywords={[]} isProtected={true} >
            <Box p={8} bg="gray.100" minH="100vh">
                <VStack spacing={6} align="stretch" maxW="1200px" mx="auto"> {/* Increased maxW for wider container */}
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

                    <Box bg="white" p={6} borderRadius="md" shadow="md" minH="400px">

                        {/* Wrapping table content in Chakra UI's <Table> component */}
                        <Table variant="simple" width="100%"> {/* You can increase table width here */}
                            <Thead>
                                <Tr>
                                    <Th minWidth="150px">Created Time</Th> {/* Increased width */}
                                    <Th minWidth="200px">Date From-To</Th> {/* Increased width */}
                                    <Th>Import/Export</Th>
                                    <Th>Buyer Name</Th>
                                    <Th>Supplier Name</Th>
                                    <Th>HS Code</Th>
                                    <Th>Country Code</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {currentQueries.map((query) => (
                                    <Tr key={query.id}>
                                        <Td>{query.createdTime}</Td>
                                        <Td>{query.dateFrom} - {query.dateTo}</Td>
                                        <Td>{query.importExport}</Td>
                                        <Td>{query.buyerName}</Td>
                                        <Td>{query.supplierName}</Td>
                                        <Td>{query.hsCode}</Td>
                                        <Td>{query.countryCode}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

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
                                isDisabled={currentPage * pageSize >= displayQueries.length}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </VStack>
            </Box>
        </AppPage>
    );
};

export default Queries;
