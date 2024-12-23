import React, { useState } from "react";
import axios from "axios";

import {
    Box,
    Button,
    Checkbox,
    Card,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Flex,
    Stack,
    Spinner,
    Select,
    Text,
    HStack,
    useToast,
    Link as ChakraLink,
    IconButton,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import TermsAndCondition from "./termsAndConsition";
=======
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; 
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29

const Register = () => {
    const screens = useBreakpointValue({ base: "Mobile", md: "Desktop" });
    const [formValues, setFormValues] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        gstNumber: "",
        address: "",
        plan: "",
<<<<<<< HEAD
        agreeTerms: false,
=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
<<<<<<< HEAD
    const [isModalOpen, setIsModalOpen] = useState(false);
=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
    const navigate = useNavigate();
    const toast = useToast();

    const validateField = (name, value) => {
        let error = "";
        if (name === "fullName" && !value) {
            error = "Please input your full name!";
        }
        if (name === "email" && !value) {
            error = "Please enter your email!";
        }
<<<<<<< HEAD
        if (name === "mobileNumber" && !value) {
            error = "Please enter your phone number";
        }
        if (name === "confirmPassword" && value !== formValues.password) {
            error = "Passwords do not match!";
        }
=======
        // if (name === "mobileNumber" && (!value || !/^\d{10}$/.test(value))) {
        //     error = "Please enter a valid 10-digit phone number!";
        // }
        // if (
        //     name === "password" &&
        //     (value.length < 8 ||
        //         !/[A-Z]/.test(value) ||
        //         !/[a-z]/.test(value) ||
        //         !/\d/.test(value) ||
        //         !/[!@#$%^&*]/.test(value))
        // ) {
        //     error =
        //         "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character!";
        // }
        if (name === "confirmPassword" && value !== formValues.password) {
            error = "Passwords do not match!";
        }
        // if (name === "plan" && !value) {
        //     error = "Please select a plan!";
        // }
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        return error;
    };



    const validateForm = () => {
        let errors = {};
        if (!formValues.fullName) {
            errors.fullName = "Please input your full name!";
        }
        if (!formValues.email) {
            errors.email = "Please enter your email!";
        }
        if (!formValues.agreeTerms) {
            errors.agreeTerms = "You must agree to the terms and conditions.";
        }
<<<<<<< HEAD
        if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!";
        }
=======
        // if (!formValues.mobileNumber || !/^\d{10}$/.test(formValues.mobileNumber)) {
        //     errors.mobileNumber = "Please enter a valid 10-digit phone number!";
        // }
        // if (
        //     !formValues.password ||
        //     formValues.password.length < 8 ||
        //     !/[A-Z]/.test(formValues.password) ||
        //     !/[a-z]/.test(formValues.password) ||
        //     !/\d/.test(formValues.password) ||
        //     !/[!@#$%^&*]/.test(formValues.password)
        // ) {
        //     errors.password =
        //         "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character!";
        // }
        if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!";
        }
        // if (!formValues.plan) {
        //     errors.plan = "Please select a plan!";
        // }
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: validateField(name, value),
        });
    };

<<<<<<< HEAD
    const handleRegister = async () => {
        try {

=======

    const handleRegister = async () => {
        try {
            
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            const { data: createAccountResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                email: formValues.email.toLowerCase(),
                password: formValues.password,
                name: formValues.fullName,
                companyName: formValues.companyName,
                phoneNumber: formValues.mobileNumber,
                phoneNumberCountryCode: selectedCountryCode,
                licenseType: "TRIAL",
            });

<<<<<<< HEAD
            toast({
                title: "Account created successfully!",
                description: `An email from ID "info@aashitaenterprises.com" has been sent to you. Please check your email (including spam folder) and activate your account.`,
=======

            toast({
                title: "Account created successfully!",
                description: `An email from ID an1gupta0693@gmail.com has been sent to you. Please check your email (including spam folder) and activate your account.`,
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                status: "success",
                duration: 4000,
                isClosable: true,
            });

            navigate("/login");

<<<<<<< HEAD
=======

>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast({
                    title: "Email or Phone No. already exists.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top"
                });
            } else {
                toast({
                    title: "Failed to create account.",
                    description: error?.message || "Something went wrong!",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top"
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinish = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
<<<<<<< HEAD
            handleRegister();
=======
            handleRegister(); // Call the API to register the user
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        }
    };

    const countryCodes = [
        { code: "+91", country: "India" },
        { code: "+84", country: "Vietnam" },
<<<<<<< HEAD
        { code: "+62", country: "Indonesia" },
=======
        { code: "+86", country: "China" },
        { code: "+66", country: "Thailand" },
        { code: "+81", country: "Japan" },
        { code: "+44", country: "UK" },
        { code: "+82", country: "South Korea" },
        { code: "+49", country: "Germany" },
        { code: "+33", country: "France" },
        { code: "+55", country: "Brazil" },
        { code: "+61", country: "Australia" },
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
    ];


    const handleCountryCodeChange = (e) => {
        setSelectedCountryCode(e.target.value);
    };

<<<<<<< HEAD
=======
    // const openModal = () => setIsModalOpen(true); // Open modal
    // const closeModal = () => setIsModalOpen(false); // Close modal

>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" overflow="hidden">
            <Card p={6} w={screens === "Mobile" ? "100%" : "700px"} boxShadow="lg">

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

                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Now, tell us a bit about yourself
                </Heading>

                <form onSubmit={onFinish}>
                    <Stack spacing={6}>
                        <HStack spacing={4}>
                            <FormControl isRequired isInvalid={!!errors.fullName} flex="1">
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formValues.fullName}
                                    onChange={handleInputChange}
                                />
                                {errors.fullName && (
                                    <Text color="red.500">{errors.fullName}</Text>
                                )}
                            </FormControl>

                            <FormControl isRequired isInvalid={!!errors.email} flex="1">
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <Text color="red.500">{errors.email}</Text>
                                )}
                            </FormControl>
                        </HStack>

                        <HStack spacing={4}>

                            <FormControl isRequired isInvalid={!!errors.mobileNumber} flex="1">
                                <FormLabel>Mobile Number</FormLabel>
                                <InputGroup>
                                    <Select
                                        w="28"
                                        value={selectedCountryCode}
                                        onChange={handleCountryCodeChange}
                                    >
                                        {countryCodes.map((country) => (
                                            <option key={country.code} value={country.code}>
                                                {country.code} ({country.country})
                                            </option>
                                        ))}
                                    </Select>
                                    <Input
<<<<<<< HEAD
                                        type="number"
=======
                                        type="tel"
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                                        name="mobileNumber"
                                        placeholder="Enter your phone number"
                                        value={formValues.mobileNumber}
                                        onChange={handleInputChange}
                                        ml={2}
                                    />
                                </InputGroup>
                                {errors.mobileNumber && <Text color="red.500">{errors.mobileNumber}</Text>}
                            </FormControl>


                            <FormControl isRequired isInvalid={!!errors.password} flex="1">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            variant="link"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && (
                                    <Text color="red.500">{errors.password}</Text>
                                )}
                            </FormControl>
                        </HStack>

                        <HStack spacing={4}>
                            <FormControl flex="1">
                                <FormLabel>Company Name</FormLabel>
                                <Input
                                    name="companyName"
                                    placeholder="Enter your company name"
                                    value={formValues.companyName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>

                            <FormControl isRequired isInvalid={!!errors.confirmPassword} flex="1">
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formValues.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            variant="link"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                            icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                {errors.confirmPassword && (
                                    <Text color="red.500">{errors.confirmPassword}</Text>
                                )}
                            </FormControl>
                        </HStack>

                        <HStack spacing={4}>
                            <FormControl flex="1">
                                <FormLabel>GST Number</FormLabel>
                                <Input
                                    name="gstNumber"
                                    placeholder="Enter your GST number"
                                    value={formValues.gstNumber}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl flex="1">
                                <FormLabel>Address</FormLabel>
                                <Input
                                    name="address"
                                    placeholder="Enter your address"
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                />
                            </FormControl>

                        </HStack>

<<<<<<< HEAD
                        <FormControl isRequired isInvalid={!!errors.agreeTerms} display="flex" justifyContent="center">
                            <Checkbox
                                name="agreeTerms"
                                isChecked={formValues.agreeTerms}
                                onChange={(e) => {
                                    setFormValues({ ...formValues, agreeTerms: e.target.checked });
                                    if (e.target.checked) {
                                        setIsModalOpen(true);
                                    }
                                }}
                            >
                                I agree to the{" "}
                                <Text
                                    as="span"
                                    color="blue.500"
                                    cursor="pointer"
                                    onClick={() => setIsModalOpen(true)}
                                    _hover={{ textDecoration: 'underline' }}
                                >
                                    terms and conditions
                                </Text>
=======

                        {/* <HStack spacing={4}>
                                <FormControl isRequired isInvalid={!!errors.plan} flex="1">
                                    <FormLabel>Select a Plan</FormLabel>
                                    <Select
                                        name="plan"
                                        placeholder="Select a plan"
                                        value={formValues.plan}
                                        onChange={(e) => handlePlanChange(e.target.value)}
                                    >
                                        <option value="Silver">Silver</option>
                                        <option value="Diamond">Diamond</option>
                                        <option value="Trial">Trial</option>
                                    </Select>
                                    {errors.plan && (
                                        <Text color="red.500">{errors.plan}</Text>
                                    )}
                                </FormControl>
                                <Button
                                    colorScheme="teal"
                                    variant="outline"
                                    onClick={openModal} // Open modal on click
                                >
                                    View Plan Details
                                </Button>
                            </HStack> */}


                        <FormControl isRequired isInvalid={!!errors.agreeTerms} display="flex" justifyContent="Center">
                            <Checkbox
                                name="agreeTerms"
                                isChecked={formValues.agreeTerms}
                                onChange={(e) => setFormValues({ ...formValues, agreeTerms: e.target.checked })}
                            >
                                I agree to the terms and conditions
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                            </Checkbox>
                            {errors.agreeTerms && <Text color="red.500">{errors.agreeTerms}</Text>}
                        </FormControl>

<<<<<<< HEAD

=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                        <Button colorScheme="teal" type="submit">
                            Submit
                        </Button>

                        <Text mt={4} textAlign="center">
                            Already have an account?{" "}
                            <ChakraLink as={Link} to="/login" color="blue.500" fontWeight="bold">
                                Log In
                            </ChakraLink>
                        </Text>

<<<<<<< HEAD
                        <TermsAndCondition isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    </Stack>
                </form>
=======
                        {/* 
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <ModalOverlay />
                                <ModalContent maxW="800px" maxH="700px">
                                    <ModalHeader>Plan Details</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <PlanDetails /> 
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="teal" mr={3} onClick={closeModal}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal> */}


                    </Stack>
                </form>

>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            </Card>
        </Box>
    );
};

export default Register;
