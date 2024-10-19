import React, { useState } from 'react';
import {
    Box,
    Button,
    Select,
    FormLabel,
    FormControl,
    SimpleGrid,
    GridItem,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

import countries from 'country-list'; // Add this line to import country-list


const Landing = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        fromDate: null,
        toDate: null,
        country: 'IN',
        inOut: 'import',
        buyerName: 'AASHITA',
        hsCode: '',
        supplierName: '',
        originCountry: '',
        proDesc: '',
        billNo: '',
        email: 'test@example.com',
    });

    // Modal control hooks
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalMessage, setModalMessage] = useState('');

    // Handle form input
    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle date changes
    const handleFromDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            fromDate: date,
        }));
    };

    const handleToDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            toDate: date,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for API request
        const postData = {
            email: formData.email,
            from_date: formData.fromDate,
            to_date: formData.toDate,
            country: formData.country,
            in_out: formData.inOut.charAt(0).toUpperCase() + formData.inOut.slice(1),
            buyer_name: formData.buyerName,
            hs_code: formData.hsCode,
            supplier_name: formData.supplierName,
            origin_country: formData.originCountry,
            pro_desc: formData.proDesc,
            bill_no: formData.billNo,
        };

        try {
            const session_token = localStorage.getItem('sessionToken');

            if (!session_token) {
                toast.error('Session token is missing.');
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session_token}`,
                },
            });

            const messageCode = response.data.messageCode;

            setModalMessage(`Request received! Processing status: ${messageCode}`);
            onOpen();

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error('Invalid search parameters.');
                } else if (error.response.status === 401) {
                    toast.error('Unauthorized. Please log in again.');
                } else {
                    toast.error('Failed to submit search. Please try again later.');
                }
            } else {
                toast.error('Network error. Please check your connection.');
            }
            console.error('Error submitting search:', error);
        }
    };
    const countryOptions = countries.getData().map((country) => ({
        value: country.code,
        label: `${country.name} (${country.code})`,
    })); // Add this to generate country options

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
                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">From Date</FormLabel>
                                <DatePicker
                                    selected={formData.fromDate}
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
                                        return !formData.toDate || date <= formData.toDate;
                                    }}
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">To Date</FormLabel>
                                <DatePicker
                                    selected={formData.toDate}
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
                                        return !formData.fromDate || date >= formData.fromDate;
                                    }}
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">Country</FormLabel>
                                {/* <Select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleFormInput}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                >
                                    <option value="IN">India (IN)</option>
                                </Select> */}

                                <Select
                                    name="country"
                                    value={formData.country}
                                    onChange={(e) => handleFormInput({ target: { name: 'country', value: e.target.value } })} // Update this line
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                >
                                    {countryOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option> // Replace existing options with dynamic ones
                                    ))}
                                </Select>

                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="medium">In/Out</FormLabel>
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

                        {/* Product Description field spans 2 columns */}
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

                        {/* Button occupies the third column */}
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

                {/* Modal for showing the message */}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Request Received</ModalHeader>
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
        </>
    );
};

export default Landing;
