import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    Grid,
    GridItem,
    Card,
    CardHeader,
    CardBody,
    Flex,
    Divider,
    useToast,

} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';

import AppPage from '../layouts/AppPage';

const Payment = () => {

    const user = useSelector((state) => state.user);
    const [paymentDetails, setPaymentDetails] = useState({
        utrNo: "",
        paymentDate: "",
        transactionId: "", // Mapping for UTR number
    });
    const [licenseData, setLicenseData] = useState({
        LicenseType: "",
        Amount: 0,
    });
    const navigate = useNavigate();
    const location = useLocation();

    const toast = useToast();

    // Fetch license details from API
    useEffect(() => {
        const fetchLicenseData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/license`, {
                    headers: {
                        'Session-Token': user.sessionToken,
                    },
                });
                // Assuming the license data for the selected plan is available in response
                const selectedLicense = response.data.find(
                    (license) => license.LicenseType === location.state.licenseType
                );
                if (selectedLicense) {
                    setLicenseData({
                        LicenseType: selectedLicense.LicenseType,
                        Amount: selectedLicense.TotalPrice,
                    });
                }
            } catch (error) {
                console.error("Error fetching license data:", error);
            }
        };
        fetchLicenseData();
    }, [location.state.licenseType]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            TransactionId: paymentDetails.utrNo,
            LicenseType: licenseData.LicenseType,
            Amount: licenseData.Amount,
            PaymentDate: paymentDetails.paymentDate,
        };

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit-payment`, payload, {
                headers: {
                    'Session-Token': user.sessionToken,
                },
            });
            toast({
                title: "Payment Submitted",
                description: "Your message has been received. We will verify your payment and activate you account shortly.",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            if (error.response &&
                error.response.status === 400 &&
                error.response.data === "Payment already submitted"
            ) {
                toast({
                    title: "Payment Already Submitted",
                    description: "This payment has already been submitted. Please check your payment status or contact support.",
                    status: "warning",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            } else {
                toast({
                    title: "Submission Failed",
                    description: "An error occurred while submitting the payment. Please try again.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                console.error("Error submitting payment:", error);
            }
        }
    };

    return (

        <AppPage title="Payment" description="" keywords={[]} isProtected={true}>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="white">
                <Grid templateColumns="repeat(2, 1fr)" gap={6} width="80%">
                    <GridItem>
                        <Card bg="white" boxShadow="lg" borderRadius="md">
                            <CardHeader>
                                <Text fontSize="2xl" textAlign="center" color="teal.600">Payment Information</Text>
                            </CardHeader>
                            <CardBody>
                                <Flex direction="column" alignItems="center">
                                    <Text fontWeight="bold" mb={2}>QR Code</Text>
                                    <Box
                                        as="img"
                                        src="https://api.qrserver.com/v1/create-qr-code/?data=example@upi&size=200x200"
                                        alt="QR Code"
                                        width="200px"
                                        height="200px"
                                        mb={4}
                                        borderWidth="1px"
                                        borderRadius="md"
                                    />
                                    <Text fontWeight="bold" mb={2}>UPI ID: <span style={{ color: 'teal.500' }}>example@upi</span></Text>
                                    <Divider />
                                    <Text fontWeight="bold" mt={4}>Bank Details</Text>
                                    <Box borderWidth="1px" borderRadius="md" p={4} mt={2} bg="gray.50">
                                        <Text fontWeight="medium">Account No: <strong>650014159285</strong></Text>
                                        <Text fontWeight="medium">IFSC Code: <strong>INDB0000562</strong></Text>
                                        <Text fontWeight="medium">Bank: <strong>INDUSIND BANK LTD</strong></Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card bg="white" boxShadow="lg" borderRadius="md">
                            <CardHeader>
                                <Text fontSize="2xl" textAlign="center" color="teal.600" mb={4}>Fill Payment Details</Text>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={4}>
                                        <FormControl isRequired>
                                            <FormLabel color="teal.600">UTR No.</FormLabel>
                                            <Input
                                                name="utrNo"
                                                placeholder="Enter your UTR No."
                                                value={paymentDetails.utrNo}
                                                onChange={handleInputChange}
                                                borderColor="teal.400"
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel color="teal.600">Date of Payment</FormLabel>
                                            <Input
                                                type="date"
                                                name="paymentDate"
                                                value={paymentDetails.paymentDate}
                                                onChange={handleInputChange}
                                                borderColor="teal.400"
                                            />
                                        </FormControl>
                                        <Button colorScheme="teal" type="submit" mt={4}>Submit Payment Details</Button>
                                    </Stack>
                                </form>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </Box>
        </AppPage>
    );
};

export default Payment;
