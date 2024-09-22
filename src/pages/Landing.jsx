import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Select,
    FormLabel,
    FormControl,
    SimpleGrid,
    GridItem,
    Textarea,
    Heading,
    Flex,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Landing = () => {
    // Form state
    const [formData, setFormData] = useState({
        fromDate: 'YYYY-MM-DD',
        toDate: 'YYYY-MM-DD',
        country: 'IN',
        inOut: 'import',
        buyerName: 'AASHITA',
        hsCode: '',
        supplierName: '',
        originCountry: '',
        proDesc: '',
        billNo: '',
    });

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Perform search operation or form submission logic here
    };

    return (
        <>
            <Navbar />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={4}
                bg="gray.100"
                minH="calc(100vh - 14vh)"
            >
                <Box
                    as="form"
                    onSubmit={handleSubmit}
                    width="full"
                    maxW="5xl"
                    p={4}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="lg"
                >
                    <SimpleGrid columns={{ base: 1, md: 3 }} m={6} spacing={6} spacingX={24}>
                        {/* First Row: From, To, Country */}
                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">From</FormLabel>
                                <Input
                                    type="date"
                                    name="fromDate"
                                    value={formData.fromDate}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">To</FormLabel>
                                <Input
                                    type="date"
                                    name="toDate"
                                    value={formData.toDate}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">Country</FormLabel>
                                <Select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                >
                                    <option value="IN">India (IN)</option>
                                </Select>
                            </FormControl>
                        </GridItem>

                        {/* Second Row: In/Out, Buyer Name, HS Code */}
                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">In/Out</FormLabel>
                                <Select
                                    name="inOut"
                                    value={formData.inOut}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                >
                                    <option value="import">Import</option>
                                    <option value="export">Export</option>
                                </Select>
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">Buyer Name</FormLabel>
                                <Input
                                    type="text"
                                    name="buyerName"
                                    value={formData.buyerName}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                    placeholder="Enter buyer name"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">HS Code</FormLabel>
                                <Input
                                    type="text"
                                    name="hsCode"
                                    value={formData.hsCode}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                    placeholder="Enter HS code"
                                />
                            </FormControl>
                        </GridItem>

                        {/* Third Row: Supplier Name, Origin Country, Bill No */}
                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">Supplier Name</FormLabel>
                                <Input
                                    type="text"
                                    name="supplierName"
                                    value={formData.supplierName}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                    placeholder="Enter supplier name"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">Origin Country</FormLabel>
                                <Input
                                    type="text"
                                    name="originCountry"
                                    value={formData.originCountry}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                    placeholder="Enter origin country"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">Bill No</FormLabel>
                                <Input
                                    type="text"
                                    name="billNo"
                                    value={formData.billNo}
                                    onChange={handleChange}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                    placeholder="Enter bill number"
                                />
                            </FormControl>
                        </GridItem>

                        {/* Fourth Row: Product Description and Search Button in one row */}
                        <GridItem colSpan={{ base: 1, md: 3 }}>
                            <Flex>
                                <FormControl flex="2" mr={4}>
                                    <FormLabel fontSize="sm" fontWeight="medium">Product Description</FormLabel>
                                    <Textarea
                                        name="proDesc"
                                        value={formData.proDesc}
                                        onChange={handleChange}
                                        size="md"
                                        bg="gray.50"
                                        _hover={{ borderColor: 'blue.400' }}
                                        fontSize="sm"
                                        placeholder="Enter product description"
                                        resize="vertical"
                                    />
                                </FormControl>

                                <FormControl flex="1" alignSelf="flex-end">
                                    <Button
                                        type="submit"
                                        colorScheme="blue"
                                        size="lg"
                                        w="auto"
                                        mt={4}
                                        position="absolute"
                                        right={0}
                                        bottom={0}
                                        bg="blue.500"
                                        _hover={{ bg: 'blue.600' }}
                                        _active={{ bg: 'blue.700' }}
                                        fontSize="md"

                                    >
                                        Search
                                    </Button>
                                </FormControl>
                            </Flex>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default Landing;
