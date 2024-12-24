import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Button, Select, FormLabel, FormControl, Spinner, useToast, Flex, SimpleGrid, GridItem, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppPage from '../layouts/AppPage';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchOTP from './SearchOTP';
import { clearUser } from '../redux/slices/user/index';
=======
import { Box, Button, Select, FormLabel, FormControl, useToast, Flex, Text, Heading, List, ListItem, SimpleGrid, GridItem, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppPage from '../layouts/AppPage';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import countries from 'country-list';
import SearchOTP from './SearchOTP';
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29

const Landing = () => {
    const navigate = useNavigate();

<<<<<<< HEAD
    const dispatch = useDispatch();
    const toast = useToast();

    const user = useSelector((state) => state.user);

    const [isLoading, setLoading] = useState(false);
    const [tokensData, setTokensData] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formData, setFormData] = useState({
        from_date: '',
        to_date: '',
        country: 'india',
=======
    const toast = useToast();
    const user = useSelector((state) => state.user);
    const [tokensData, setTokensData] = useState(0);
    const [formData, setFormData] = useState({
        from_date: '',
        to_date: '',
        country: 'IN',
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        inOut: 'import',
        buyerName: '',
        hsCode: '',
        supplierName: '',
        originCountry: '',
<<<<<<< HEAD
        destinationCountry: '',
        proDesc: '',
        billNo: '',
        email: user.user_id,
=======
        destination_Country:'',
        proDesc: '',
        billNo: '',
        email: 'test@example.com',
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        number_of_records: ''
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
<<<<<<< HEAD
    const [postData, setPostData] = useState(null);

    // Fetch token data on component mount

    console.log("------User Data -------", user);

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tokens`, {
                    headers: {
                        'Session-Token': user.session_token, // Ensure this matches the Redux key
                    },
                });
                setTokensData(response.data.tokens);
                // console.log("Remaining Tokens:", response.data.tokens);
=======
    const [otpVerified, setOtpVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

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
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            } catch (error) {
                console.error("Error fetching token data:", error);
            }
        };

        fetchTokenData();
<<<<<<< HEAD
    }, [user.session_token]);

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userInfo`, {
                    headers: {
                        'Session-Token': user.session_token, // Consistent key usage here too
                    },
                });

                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.code === "SESSION_ABSENT") {

                    console.log("------User Data before clear-------", user);

                    dispatch(clearUser());
                    console.log("------User Data after clear-------", user);

                    // alert("Something went wrong. Please log in again.");
                    dispatch(clearUser());
                    // navigate("/login");
                    dispatch(clearUser());

                } else {
                    console.error("Error fetching phone number:", error);
                }
            }
        };

        fetchPhoneNumber();
    }, [user.session_token, dispatch, toast]);
=======
    }, [user.sessionToken]);

    const handleSearchClick = () => {
        setIsOtpModalOpen(true);
    };

>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29

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


<<<<<<< HEAD

    // Trigger OTP modal after preliminary checks
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Form submitted");
=======
    // Trigger OTP modal after preliminary checks
    const handleSubmit = async (e) => {
        e.preventDefault();

>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
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

        // Validate required fields
        const requiredFields = ['from_date', 'to_date', 'number_of_records'];
<<<<<<< HEAD
        const fieldLabels = {
            from_date: "From Date",
            to_date: "To Date",
            number_of_records: "Number of records"
        };

        const emptyFields = requiredFields.filter(field => !formData[field] && field !== 'proDesc');

        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.map(field => fieldLabels[field] || field);

            toast({
                title: "Validation Error",
                description: `Please fill the following fields: ${emptyFieldNames.join(', ')}`,
=======
        const emptyFields = requiredFields.filter(field => !formData[field] && field !== 'proDesc');

        if (emptyFields.length > 0) {
            toast({
                title: "Validation Error",
                description: `Please fill the following fields: ${emptyFields.join(', ')}`,
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            return;
        }

<<<<<<< HEAD

        const conditionalFields = [
            'destinationCountry', 'originCountry', 'supplierName', 'hsCode', 'buyerName'
        ];

        // Log formData to ensure fields are present
        console.log("Form Data:", formData);

=======
        const conditionalFields = [
            'destination_Country', 'originCountry', 'supplierName', 'hsCode', 'buyerName'
        ];
        
        // Log formData to ensure fields are present
        console.log("Form Data:", formData);
        
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        const isAtLeastOneFieldFilled = conditionalFields.some(field => {
            const value = formData[field]?.trim();
            console.log(`${field}:`, value); // Log each field value for debugging
            return value !== '';
        });
<<<<<<< HEAD

=======
        
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        if (!isAtLeastOneFieldFilled) {
            toast({
                title: "Validation Error",
                description: "At least one of the following fields must be filled: Destination Country, Origin Country, Supplier Name, HS Code, or Buyer Name.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            return;
        }
<<<<<<< HEAD

=======
        
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29

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

<<<<<<< HEAD


=======
        // Open OTP modal after all checks
        onOpen();
    };

    // Call search API after OTP verification
    const handleOtpVerified = async () => {
        setIsOtpModalOpen(false);  // Close the modal

        const sessionToken = user.sessionToken;
        const countryName = countries.getName(formData.country);
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        const postData = {
            email: formData.email,
            from_date: formData.from_date ? formData.from_date.toISOString().split('T')[0] : '',
            to_date: formData.to_date ? formData.to_date.toISOString().split('T')[0] : '',
<<<<<<< HEAD
            country: formData.country,
=======
            country: countryName,
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            is_export: formData.inOut === 'export',
            buyer_name: formData.buyerName,
            hs_code: formData.hsCode,
            supplier_name: formData.supplierName,
            origin_country: formData.originCountry,
<<<<<<< HEAD
            destination_country: formData.destinationCountry,
=======
            destination_Country: formData.destination_Country,
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            pro_desc: formData.proDesc,
            bill_no: formData.billNo,
            number_of_records: formData.number_of_records,
        };

<<<<<<< HEAD

        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-otp`, { phoneNumber }, {
                headers: {
                    'Session-Token': user.session_token,
                },
            });
            setLoading(false);
            toast({
                title: "OTP Sent",
                description: "An OTP has been sent to your registered email.",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            console.log("opened------00000-")
            setPostData(postData); // Prepare postData for OTP modal
            onOpen(); // Open OTP modal after sending OTP

            console.log("opened-------")
        } catch (error) {
            setLoading(false);
            console.error("Error sending OTP:", error);
            toast({
                title: "Error Sending OTP",
                description: "Failed to send OTP. Please try again.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
        }
    };

    const handleCloseModal = () => {
        setFormData({
            from_date: '',
            to_date: '',
            country: 'india',
            inOut: 'import',
            buyerName: '',
            hsCode: '',
            supplierName: '',
            originCountry: '',
            proDesc: '',
            billNo: '',
            email: user.user_id,
            number_of_records: '',
            destinationCountry: ''
        });
        onClose();
    };

    // const countryOptions = [
    //     { label: "India", value: "india" },
    //     { label: "Vietnam", value: "vietnam" },
    //     { label: "Indonesia", value: "indonesia" },
    // ];
=======
        try {
            setIsSubmitting(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, postData, {
                headers: {
                    'Session-Token': sessionToken,
                },
            });

            // Handle response (e.g., display results)
            console.log('Search API response:', response.data);

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
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleCloseModal = () => {
        // setFormData({
        //     from_date: '',
        //     to_date: '',
        //     country: 'IN',
        //     inOut: 'import',
        //     buyerName: '',
        //     hsCode: '',
        //     supplierName: '',
        //     originCountry: '',
        //     proDesc: '',
        //     billNo: '',
        //     email: 'test@example.com',
        //     number_of_records: ''
        // });
        onClose();
    };

    const countryOptions = countries.getData().map((country) => ({
        value: country.code,
        label: `${country.name} (${country.code})`,
    }));




>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29

    return (
        <AppPage title="Home" description="" keywords={[]} isProtected={true}>

            <form onSubmit={handleSubmit} style={{
                width: '100%', maxWidth: '5xl', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem',
                paddingBottom: '0.5rem', marginBottom: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
<<<<<<< HEAD

                {/* <form onSubmit={handleSubmit} style={{
                width: '100%', maxWidth: '5xl', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem',
                paddingBottom: '0.5rem', marginBottom: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}> */}
                {isLoading && (
                    <Flex
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        alignItems="center"
                        justifyContent="center"
                        bg="rgba(255, 255, 255, 0.7)"
                        zIndex="10"
                    >
                        <Spinner size="xl" />
                    </Flex>
                )}

=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} m={0} spacing={4} spacingX={2}>
                    <GridItem >
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">From Date</FormLabel>
                            <DatePicker
                                selected={formData.from_date}
                                onChange={handleFromDateChange}
                                dateFormat="dd/MM/yyyy"
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
                                dateFormat="dd/MM/yyyy"
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
<<<<<<< HEAD
                                // onChange={(e) => handleFormInput({ target: { name: 'country', value: e.target.value } })}
                                onChange={handleFormInput}
=======
                                onChange={(e) => handleFormInput({ target: { name: 'country', value: e.target.value } })}
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                                size="md"
                                bg="gray.50"
                                _hover={{ borderColor: 'blue.400' }}
                                fontSize="sm"
                            >
<<<<<<< HEAD
                                <option value="india">India</option>
                                <option value="vietnam">Vietnam</option>
                                <option value="indonesia">Indonesia</option>
=======
                                <option value="IN">India (IN)</option>
                                <option value="VN">Vietnam (VN)</option>
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29

                                {/* {countryOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))} */}
<<<<<<< HEAD

=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
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
                            <FormLabel fontSize="sm" fontWeight="medium">Buyer Name (Import)</FormLabel>
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
                            <FormLabel fontSize="sm" fontWeight="medium">Supplier Name (Export)</FormLabel>
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
                            <FormLabel fontSize="sm" fontWeight="medium">Origin Country (COO)</FormLabel>
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
<<<<<<< HEAD
                            {user.licenseType === "TRIAL" ? (
                                <Input
                                    type="text"
                                    name="number_of_records"
                                    value={formData.number_of_records}
                                    // onChange={handleFormInput}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Allow only numbers and ensure the value is between 0 and 10
                                        if (/^\d*$/.test(value) && value >= 0 && value <= 10) {
                                            handleFormInput(e); // Call your existing handler
                                        }
                                    }}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                    placeholder="Number of Records"
                                />
                            ) : (
                                <Select
                                    name="number_of_records"
                                    value={formData.number_of_records}
                                    onChange={handleFormInput}
                                    size="md"
                                    bg="gray.50"
                                    _hover={{ borderColor: 'blue.400' }}
                                    fontSize="sm"
                                    placeholder="Number of Records"
                                >
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="300">300</option>
                                    <option value="400">400</option>
                                    <option value="500">500</option>
                                </Select>
                            )}
                        </FormControl>


=======
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
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Destination Country (COE)</FormLabel>
                            <Input
                                type="text"
<<<<<<< HEAD
                                name="destinationCountry"
                                value={formData.destinationCountry}
=======
                                name="destination_Country"
                                value={formData.destination_Country}
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                                onChange={handleFormInput}
                                size="md"
                                bg="gray.50"
                                _hover={{ borderColor: 'blue.400' }}
                                fontSize="sm"
                                placeholder="Enter Destination Country"
                            />
                        </FormControl>
                    </GridItem>

                    {/* <GridItem colSpan={{ base: 1, md: 2 }}> */}

                    <GridItem>
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
<<<<<<< HEAD
                            bg="blue.500"
                            // isLoading={isLoading}
=======
                            onClick={handleSearchClick}
                            bg="blue.500"
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                            _hover={{ bg: 'blue.600' }}
                            _active={{ bg: 'blue.700' }}
                        >
                            Search
                        </Button>
                    </GridItem>
                </SimpleGrid>

            </form>
<<<<<<< HEAD
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please check your spam folder if not received email in inbox</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SearchOTP onClose={handleCloseModal} formFields={postData} />
                    </ModalBody>
                </ModalContent>
            </Modal>

=======
            {isOtpModalOpen && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Enter OTP</ModalHeader>
                        <ModalCloseButton />
                        <SearchOTP onClose={handleCloseModal} onOtpVerified={handleOtpVerified} />
                    </ModalContent>
                </Modal>
            )}

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
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29

        </AppPage>
    );
};

export default Landing;

