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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import TermsAndCondition from "./termsAndConsition";

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
        agreeTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        if (name === "mobileNumber" && !value) {
            error = "Please enter your phone number";
        }
        if (name === "confirmPassword" && value !== formValues.password) {
            error = "Passwords do not match!";
        }
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
        if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!";
        }
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

    const handleRegister = async () => {
        try {

            const { data: createAccountResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                email: formValues.email.toLowerCase(),
                password: formValues.password,
                name: formValues.fullName,
                companyName: formValues.companyName,
                phoneNumber: formValues.mobileNumber,
                phoneNumberCountryCode: selectedCountryCode,
                licenseType: "TRIAL",
            });

            toast({
                title: "Account created successfully!",
                description: `An email from ID "info@aashitaenterprises.com" has been sent to you. Please check your email (including spam folder) and activate your account.`,
                status: "success",
                duration: 4000,
                isClosable: true,
            });

            navigate("/login");

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
            handleRegister();
        }
    };

    const countryCodes = [
        { code: "+91", country: "India" },
        { code: "+84", country: "Vietnam" },
        { code: "+62", country: "Indonesia" },
    ];


    const handleCountryCodeChange = (e) => {
        setSelectedCountryCode(e.target.value);
    };

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
                                        type="number"
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
                            </Checkbox>
                            {errors.agreeTerms && <Text color="red.500">{errors.agreeTerms}</Text>}
                        </FormControl>


                        <Button colorScheme="teal" type="submit">
                            Submit
                        </Button>

                        <Text mt={4} textAlign="center">
                            Already have an account?{" "}
                            <ChakraLink as={Link} to="/login" color="blue.500" fontWeight="bold">
                                Log In
                            </ChakraLink>
                        </Text>

                        <TermsAndCondition isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    </Stack>
                </form>
            </Card>
        </Box>
    );
};

export default Register;
