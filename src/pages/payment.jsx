// Payment.jsx
import React, { useState } from "react";
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
    CardFooter,
    Flex,
    Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        utnNo: "",
        transactionId: "",
        paymentDate: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Payment Details:", paymentDetails);
        navigate("/login"); // Redirect to the login page after submission
    };

    return (

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
                                {/* Use a random QR code generator for demo */}
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
                                        <FormLabel color="teal.600">Enter Your Phone No</FormLabel>
                                        <Input
                                            name="utnNo"
                                            placeholder="Enter your Phone No."
                                    
                                            borderColor="teal.400"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel color="teal.600">UTR No.</FormLabel>
                                        <Input
                                            name="utnNo"
                                            placeholder="Enter your UTR No."
                                            value={paymentDetails.utnNo}
                                            onChange={handleInputChange}
                                            borderColor="teal.400"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel color="teal.600">Email ID</FormLabel>
                                        <Input
                                            name="transactionId"
                                            placeholder="Enter your email ID"
                                            value={paymentDetails.transactionId}
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
    );
};

export default Payment;