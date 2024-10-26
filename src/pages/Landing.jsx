import React, { useState, useEffect } from 'react';
import { Box, Button, Select, FormLabel, FormControl, SimpleGrid, GridItem, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react';
import axios from 'axios';
import AppPage from '../layouts/AppPage';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import countries from 'country-list';
import toast from 'react-hot-toast';

const Landing = () => {
    const user = useSelector((state) => state.user);
    const [tokensData, setTokensData] = useState(0); // State to hold the remaining tokens
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
    const [modalMessage, setModalMessage] = useState('');

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
                toast.error("Failed to fetch token data");
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
        const sessionToken = user.sessionToken;

        // Check if number of records exceeds remaining tokens
        if (parseInt(formData.number_of_records) > tokensData) {
            setModalMessage("Number of records cannot be more than remaining tokens.");
            onOpen();
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

            const messageCode = response.data.message;
            setModalMessage(`Request received! You will receive an email.`);
            onOpen();

        } catch (error) {
            if (error.response && error.response.status === 429) {
                setModalMessage("You have reached the limit of requests. Please try again later.");
            } else {
                setModalMessage("An unexpected error occurred. Please try again.");
            }
            onOpen();
        }
    };

    const countryOptions = countries.getData().map((country) => ({
        value: country.code,
        label: `${country.name} (${country.code})`,
        // label: `${country.name}`,
    }));

    return (
        <AppPage title="Home" description="" keywords={[]} isProtected={true}>
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
                        <GridItem>
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
                                    resize="vertical"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={{ base: 1, md: 1 }} textAlign="center">
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
                </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Request Status</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {modalMessage}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </AppPage>
    );
};

export default Landing;
