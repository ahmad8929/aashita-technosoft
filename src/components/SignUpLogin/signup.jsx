import React, { useState } from "react";
import axios from "axios";

import {
    Box,
    Button,
    Card,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Stack,
    Spinner,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon,
    StepTitle,
    FormErrorMessage,
    Text,
    RadioGroup,
    Radio,
    HStack,
    useToast,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const screens = useBreakpointValue({ base: "Mobile", md: "Desktop" });
    const [currentStep, setCurrentStep] = useState(0);
    const [formValues, setFormValues] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        gstNumber: "",
        address: "",
        plan: "", // Added plan selection
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
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
        if (name === "mobileNumber" && (!value || !/^\d{10}$/.test(value))) {
            error = "Please enter a valid 10-digit phone number!";
        }
        if (
            name === "password" &&
            (value.length < 8 ||
                !/[A-Z]/.test(value) ||
                !/[a-z]/.test(value) ||
                !/\d/.test(value) ||
                !/[!@#$%^&*]/.test(value))
        ) {
            error =
                "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character!";
        }
        if (name === "confirmPassword" && value !== formValues.password) {
            error = "Passwords do not match!";
        }
        if (name === "plan" && !value) {
            error = "Please select a plan!";
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
        if (!formValues.mobileNumber || !/^\d{10}$/.test(formValues.mobileNumber)) {
            errors.mobileNumber = "Please enter a valid 10-digit phone number!";
        }
        if (
            !formValues.password ||
            formValues.password.length < 8 ||
            !/[A-Z]/.test(formValues.password) ||
            !/[a-z]/.test(formValues.password) ||
            !/\d/.test(formValues.password) ||
            !/[!@#$%^&*]/.test(formValues.password)
        ) {
            errors.password =
                "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character!";
        }
        if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!";
        }
        if (!formValues.plan) {
            errors.plan = "Please select a plan!";
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

    const handlePlanChange = (value) => {
        setFormValues({
            ...formValues,
            plan: value,
        });
        setErrors({
            ...errors,
            plan: validateField("plan", value),
        });
    };

    const onNext = () => {
        if (validateForm()) {
            setLoading(true);
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setLoading(false);
            }, 500);
        }
    };

    const handleRegister = async () => {
        try {
            const { data: createAccountResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                email: formValues.email,
                password: formValues.password,
                companyName: formValues.companyName,
                phoneNumber: formValues.mobileNumber,
                licenseType: formValues.plan,
            });

            toast({
                title: "Account created successfully!",
                description: `You have selected the ${formValues.plan} plan.`,
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            navigate("/landing"); // Redirect to the landing page after successful registration
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast({
                    title: "Email already exists.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Failed to create account.",
                    description: error?.message || "Something went wrong!",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinish = () => {
        if (validateForm()) {
            setLoading(true);
            handleRegister(); // Call the API to register the user
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card p={6} w={screens === "Mobile" ? "100%" : "600px"} boxShadow="lg">
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Now, tell us a bit about yourself
                </Heading>

                <Stepper index={currentStep} mb={6}>
                    <Step>
                        <StepIndicator>
                            <StepStatus complete={<StepIcon />} />
                        </StepIndicator>
                        <StepTitle>Basic Details</StepTitle>
                    </Step>
                    <Step>
                        <StepIndicator>
                            <StepStatus complete={<StepIcon />} />
                        </StepIndicator>
                        <StepTitle>More Details</StepTitle>
                    </Step>
                </Stepper>

                {loading ? (
                    <Spinner size="lg" />
                ) : (
                    <form>
                        {currentStep === 0 && (
                            <Stack spacing={4}>
                                <FormControl isRequired isInvalid={!!errors.fullName}>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formValues.fullName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.fullName && (
                                        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && (
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.mobileNumber}>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <Input
                                        type="tel"
                                        name="mobileNumber"
                                        placeholder="Enter your 10-digit phone number"
                                        value={formValues.mobileNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.mobileNumber && (
                                        <FormErrorMessage>{errors.mobileNumber}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.password}>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                    />
                                    {errors.password && (
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formValues.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    {errors.confirmPassword && (
                                        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.plan}>
                                    <FormLabel>Select a Plan</FormLabel>
                                    <RadioGroup
                                        name="plan"
                                        value={formValues.plan}
                                        onChange={handlePlanChange}
                                    >
                                        <HStack spacing={4}>
                                            <Radio value="Silver">Silver</Radio>
                                            <Radio value="Gold">Gold</Radio>
                                            <Radio value="Premium">Premium</Radio>
                                        </HStack>
                                    </RadioGroup>
                                    {errors.plan && (
                                        <FormErrorMessage>{errors.plan}</FormErrorMessage>
                                    )}
                                </FormControl>
                            </Stack>
                        )}

                        {currentStep === 1 && (
                            <Stack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Company Name</FormLabel>
                                    <Input
                                        name="companyName"
                                        placeholder="Enter your company name"
                                        value={formValues.companyName}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>GST Number</FormLabel>
                                    <Input
                                        name="gstNumber"
                                        placeholder="Enter your GST number"
                                        value={formValues.gstNumber}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Address</FormLabel>
                                    <Input
                                        name="address"
                                        placeholder="Enter your address"
                                        value={formValues.address}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </Stack>
                        )}

                        <Stack direction="row" spacing={4} mt={6} justifyContent="center">
                            {currentStep > 0 && (
                                <Button onClick={() => setCurrentStep(currentStep - 1)}>
                                    Previous
                                </Button>
                            )}
                            {currentStep < 1 && (
                                <Button colorScheme="teal" onClick={onNext}>
                                    Next
                                </Button>
                            )}
                            {currentStep === 1 && (
                                <Button colorScheme="teal" onClick={onFinish}>
                                    Submit
                                </Button>
                            )}
                        </Stack>

                        {currentStep === 0 && (
                            <Text mt={4} textAlign="center">
                                Already have an account?{" "}
                                <ChakraLink as={Link} to="/login" color="blue.500" fontWeight="bold">
                                    Log In
                                </ChakraLink>
                            </Text>
                        )}
                    </form>
                )}
            </Card>
        </Box>
    );
};

export default Register;
