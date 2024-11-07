import React, { useState, useEffect } from 'react';
import { Box, Button, Select, FormLabel, FormControl, useToast, Flex, Text, Heading, List, ListItem, SimpleGrid, GridItem, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppPage from '../layouts/AppPage';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import countries from 'country-list';
import SearchOTP from './SearchOTP';

const Landing = () => {
    const navigate = useNavigate();

    const toast = useToast();
    const user = useSelector((state) => state.user);
    const [tokensData, setTokensData] = useState(0);
    const [formData, setFormData] = useState({
        from_date: '',
        to_date: '',
        country: 'IN',
        inOut: 'import',
        buyerName: '',
        hsCode: '',
        supplierName: '',
        originCountry: '',
        proDesc: '',
        billNo: '',
        email: 'test@example.com',
        number_of_records: ''
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Fetch token data on component mount
    useEffect(() => {
        const fetchTokenData = async () => {
            const sessionToken = user.sessionToken;
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tokens`, {
                    headers: {
                        'Session-Token': sessionToken,
                    },
                });
                setTokensData(response.data.tokens); // Update remaining tokens
                console.log("Remaining Tokens:", response.data.tokens);
            } catch (error) {
                console.error("Error fetching token data:", error);
            }
        };

        fetchTokenData();
    }, [user.sessionToken]);

    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFromDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            from_date: date,
        }));
    };

    const handleToDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            to_date: date,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.isLoggedIn) {
            toast({
                title: "Login Required",
                description: "You must be logged in to perform a search.",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top"
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return;
        }

        const sessionToken = user.sessionToken;

        // Validate required fields
        const requiredFields = ['from_date', 'to_date', 'number_of_records'];
        const emptyFields = requiredFields.filter(field => !formData[field] && field !== 'proDesc');

        if (emptyFields.length > 0) {
            toast({
                title: "Validation Error",
                description: `Please fill the following fields: ${emptyFields.join(', ')}`,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        if (parseInt(formData.number_of_records) > tokensData) {
            toast({
                title: "Token Limit Exceeded",
                description: "Number of records cannot be more than remaining records.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        const countryName = countries.getName(formData.country);
        const postData = {
            email: formData.email,
            from_date: formData.from_date ? formData.from_date.toISOString().split('T')[0] : '',
            to_date: formData.to_date ? formData.to_date.toISOString().split('T')[0] : '',
            country: countryName,
            is_export: formData.inOut === 'export',
            buyer_name: formData.buyerName,
            hs_code: formData.hsCode,
            supplier_name: formData.supplierName,
            origin_country: formData.originCountry,
            pro_desc: formData.proDesc,
            bill_no: formData.billNo,
            number_of_records: formData.number_of_records,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, postData, {
                headers: {
                    'Session-Token': sessionToken,
                },
            });

            onOpen();

        } catch (error) {
            if (error.response && error.response.status === 429) {
                toast({
                    title: "Request Limit Reached",
                    description: "You have reached the limit of requests. Please try again later.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
            } else {
                toast({
                    title: "Unexpected Error",
                    description: "An unexpected error occurred. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
            }
        }
    };


    const handleCloseModal = () => {
        setFormData({
            from_date: '',
            to_date: '',
            country: 'IN',
            inOut: 'import',
            buyerName: '',
            hsCode: '',
            supplierName: '',
            originCountry: '',
            proDesc: '',
            billNo: '',
            email: 'test@example.com',
            number_of_records: ''
        });
        onClose();
    };

    const countryOptions = countries.getData().map((country) => ({
        value: country.code,
        label: `${country.name} (${country.code})`,
    }));

    return (
        <AppPage title="Home" description="" keywords={[]} isProtected={true}>

            <form onSubmit={handleSubmit} style={{
                width: '100%', maxWidth: '5xl', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem',
                paddingBottom: '0.5rem', marginBottom: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} m={0} spacing={4} spacingX={2}>
                    <GridItem >
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">From Date</FormLabel>
                            <DatePicker
                                selected={formData.from_date}
                                onChange={handleFromDateChange}
                                dateFormat="yyyy/MM/dd"
                                customInput={
                                    <Input
                                        placeholder="Select a date"
                                        size="md"
                                        bg="gray.50"
                                        _hover={{ borderColor: 'blue.400' }}
                                        fontSize="sm"
                                        width={{ base: "100%", sm: "100%", md: "154%" }}
                                    />
                                }
                                placeholderText="Select a date"
                                filterDate={(date) => {
                                    return !formData.to_date || date <= formData.to_date;
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">To Date</FormLabel>
                            <DatePicker
                                selected={formData.to_date}
                                onChange={handleToDateChange}
                                dateFormat="yyyy/MM/dd"
                                customInput={
                                    <Input
                                        placeholder="Select a date"
                                        size="md"
                                        bg="gray.50"
                                        _hover={{ borderColor: 'blue.400' }}
                                        fontSize="sm"
                                        width={{ base: "100%", sm: "100%", md: "154%" }}
                                    />
                                }
                                placeholderText="Select a date"
                                filterDate={(date) => {
                                    return !formData.from_date || date >= formData.from_date;
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Country</FormLabel>
                            <Select
                                name="country"
                                value={formData.country}
                                onChange={(e) => handleFormInput({ target: { name: 'country', value: e.target.value } })}
                                size="md"
                                bg="gray.50"
                                _hover={{ borderColor: 'blue.400' }}
                                fontSize="sm"
                            >
                                {countryOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Import/Export</FormLabel>
                            <Select
                                name="inOut"
                                value={formData.inOut}
                                onChange={handleFormInput}
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
                                onChange={handleFormInput}
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
                                onChange={handleFormInput}
                                size="md"
                                bg="gray.50"
                                _hover={{ borderColor: 'blue.400' }}
                                fontSize="sm"
                                placeholder="Enter HS code"
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Supplier Name</FormLabel>
                            <Input
                                type="text"
                                name="supplierName"
                                value={formData.supplierName}
                                onChange={handleFormInput}
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
                                onChange={handleFormInput}
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
                            <FormLabel fontSize="sm" fontWeight="medium">Number of Records</FormLabel>
                            <Input
                                type="text"
                                name="number_of_records"
                                value={formData.number_of_records}
                                onChange={handleFormInput}
                                size="md"
                                bg="gray.50"
                                _hover={{ borderColor: 'blue.400' }}
                                fontSize="sm"
                                placeholder="Number of Records"
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Product Description</FormLabel>
                            <Textarea
                                name="proDesc"
                                value={formData.proDesc}
                                onChange={handleFormInput}
                                size="md"
                                bg="gray.50"
                                _hover={{ borderColor: 'blue.400' }}
                                fontSize="sm"
                                placeholder="Enter product description"
                                // resize="none"
                                rows={1}
                                h="2.5rem"
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem
                        colSpan={{ base: 1, md: 1 }}
                        textAlign={{ base: "center", md: "right" }}
                        alignSelf={{ base: "center", md: "end" }}
                    >
                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            mt={4}
                            bg="blue.500"
                            _hover={{ bg: 'blue.600' }}
                            _active={{ bg: 'blue.700' }}
                        >
                            Search
                        </Button>
                    </GridItem>
                </SimpleGrid>

            </form>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter OTP</ModalHeader>
                    <ModalCloseButton />
                    <SearchOTP onClose={handleCloseModal} /> 
                </ModalContent>
            </Modal>


            <Flex direction="column" pt={2} pb={4} align="center">
                <Box w={{ base: '100%', md: '90%', lg: '80%' }} bg="white">

                    <Heading as="h1" size="xl" mb={6} textAlign="center" bg="gray.100">
                        About ImpexInfo.com
                    </Heading>

                    <Text fontSize="lg" mb={6} textAlign="center">
                        We are part of Aashita Enterprises, a B2B consultancy firm dedicated to helping organizations grow their business by analyzing data to optimize purchase prices for buyers and sales prices for sellers.
                    </Text>

                    <Text fontSize="md" mb={4}>
                        ImpexInfo.com provides deeper insights into export-import business and supply chain opportunities. With our research data, you can:
                    </Text>

                    <List spacing={3} pl={6} fontSize="md">
                        <ListItem>1. Transform export-import intelligence data into actionable insights and knowledge.</ListItem>
                        <ListItem>2. Make confident business decisions with our ready-to-use reports, which uniquely include accurate Customs Duty and IGST details separately for imports, along with landed prices.</ListItem>
                        <ListItem>3. Uncover new insights such as:</ListItem>
                        <List pl={4} styleType="disc" fontSize="md">
                            <ListItem> Finding reliable buyers and suppliers</ListItem>
                            <ListItem> Discovering new markets and promising products</ListItem>
                            <ListItem> Tracking competitors  moves</ListItem>
                            <ListItem> Analyzing demand and supply trends</ListItem>
                            <ListItem> Determining optimal product prices</ListItem>
                            <ListItem> Saving on custom duties</ListItem>
                            <ListItem> Gaining strategic information for a competitive edge</ListItem>
                        </List>
                    </List>

                    <Box mt={8}>
                        <Text fontSize="md" fontWeight="bold" mb={2}>Disclaimer</Text>
                        <Text fontSize="md">
                            Our Export & Import Trade Intelligence reports are gathered from available online and offline sources. We do not guarantee the authenticity or originality of this data. Clients are advised to use our research data at their own discretion. We are not responsible for any profit or loss resulting from the use of our reports.
                        </Text>
                    </Box>
                </Box>
            </Flex>

        </AppPage>
    );
};

export default Landing;

