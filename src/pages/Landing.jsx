import React, { useState, useEffect } from 'react';
import { Button, Select, FormLabel, FormControl, Spinner, useToast, Flex, SimpleGrid, GridItem, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppPage from '../layouts/AppPage';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchOTP from './SearchOTP';
import { clearUser } from '../redux/slices/user/index';

const Landing = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const toast = useToast();

    const user = useSelector((state) => state.user);

    const [isLoading, setLoading] = useState(false);
    const [tokensData, setTokensData] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countries, setCountries] = useState([]);

    const [formData, setFormData] = useState({
        from_date: '',
        to_date: '',
        country: 'india',
        inOut: 'import',
        buyerName: '',
        hsCode: '',
        supplierName: '',
        originCountry: '',
        destinationCountry: '',
        proDesc: '',
        billNo: '',
        email: user.user_id,
        number_of_records: ''
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
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
            } catch (error) {
                console.error("Error fetching token data:", error);
            }
        };

        fetchTokenData();
    }, [user.session_token]);

    useEffect(() => {
        const countries = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/country`, {
                    headers: {
                        'Session-Token': user.session_token, // Ensure this matches the Redux key
                    },
                });
                const formattedCountries = response.data.map((country) => ({
                    label: country,
                    value: country.toLowerCase(), // Convert country names to lowercase for the value
                }));
                setCountries(formattedCountries);
            } catch (error) {
                console.error("Error fetching token data:", error);
            }
        };

        countries();
    }, [user.session_token]);

    console.log("Countries from API", countries);

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



    // Trigger OTP modal after preliminary checks
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Form submitted");
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
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            return;
        }


        const conditionalFields = [
            'destinationCountry', 'originCountry', 'supplierName', 'hsCode', 'buyerName'
        ];

        // Log formData to ensure fields are present
        console.log("Form Data:", formData);

        const isAtLeastOneFieldFilled = conditionalFields.some(field => {
            const value = formData[field]?.trim();
            console.log(`${field}:`, value); // Log each field value for debugging
            return value !== '';
        });

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



        const postData = {
            email: formData.email,
            from_date: formData.from_date ? formData.from_date.toISOString().split('T')[0] : '',
            to_date: formData.to_date ? formData.to_date.toISOString().split('T')[0] : '',
            country: formData.country,
            is_export: formData.inOut === 'export',
            buyer_name: formData.buyerName,
            hs_code: formData.hsCode,
            supplier_name: formData.supplierName,
            origin_country: formData.originCountry,
            destination_country: formData.destinationCountry,
            pro_desc: formData.proDesc,
            bill_no: formData.billNo,
            number_of_records: formData.number_of_records,
        };


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

    return (
        <AppPage title="Home" description="" keywords={[]} isProtected={true}>

            <form onSubmit={handleSubmit} style={{
                width: '100%', maxWidth: '5xl', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem',
                paddingBottom: '0.5rem', marginBottom: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>

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
                                // onChange={(e) => handleFormInput({ target: { name: 'country', value: e.target.value } })}
                                onChange={handleFormInput}
                                size="md"
                                bg="gray.50"
                                _hover={{ borderColor: 'blue.400' }}
                                fontSize="sm"
                            >
                                {/* <option value="india">India</option>
                                <option value="vietnam">Vietnam</option>
                                <option value="indonesia">Indonesia</option> */}

                                {/* {countryOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))} */}

                                {countries.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
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
                            {user.licenseType === "TRIAL" ? (
                                <Input
                                    type="text"
                                    name="number_of_records"
                                    value={formData.number_of_records}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Allow only numeric input between 0 and 10
                                        if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 10) {
                                            handleFormInput(e);
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
                                    {/* Options based on license type */}
                                    {user.licenseType === "ADMIN" ? (
                                        <>
                                            <option value="10">10</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="300">300</option>
                                            <option value="400">400</option>
                                            <option value="500">500</option>
                                            <option value="1000">1000</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="300">300</option>
                                            <option value="400">400</option>
                                            <option value="500">500</option>
                                        </>
                                    )}
                                </Select>
                            )}
                        </FormControl>
                    </GridItem>


                    <GridItem>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Destination Country (COE)</FormLabel>
                            <Input
                                type="text"
                                name="destinationCountry"
                                value={formData.destinationCountry}
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
                            bg="blue.500"
                            // isLoading={isLoading}
                            _hover={{ bg: 'blue.600' }}
                            _active={{ bg: 'blue.700' }}
                        >
                            Search
                        </Button>
                    </GridItem>
                </SimpleGrid>

            </form>
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


        </AppPage>
    );
};

export default Landing;

