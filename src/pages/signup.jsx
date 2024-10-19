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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Importing icons for password visibility

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
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const handleRegister = async () => {
        try {
            const { data: createAccountResponse } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                email: formValues.email,
                password: formValues.password,
                companyName: formValues.companyName,
                phoneNumber: formValues.mobileNumber,
                licenseType: formValues.plan,
            });

            localStorage.setItem('accessToken', createAccountResponse?.accessToken); // change this if response is wrong

            toast({
                title: "Account created successfully!",
                description: `You have selected the ${formValues.plan} plan.`,
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            navigate("/login"); // Redirect to the login page after successful registration
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" overflow="hidden">
            <Card p={6} w={screens === "Mobile" ? "100%" : "700px"} boxShadow="lg">
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Now, tell us a bit about yourself
                </Heading>

                {loading ? (
                    <Spinner size="lg" />
                ) : (
                    <form>
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
                                    <Input
                                        type="tel"
                                        name="mobileNumber"
                                        placeholder="Enter your 10-digit phone number"
                                        value={formValues.mobileNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.mobileNumber && (
                                        <Text color="red.500">{errors.mobileNumber}</Text>
                                    )}
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

                                <FormControl isRequired flex="1">
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

                                <FormControl isRequired isInvalid={!!errors.plan} flex="1">
                                    <FormLabel>Select a Plan</FormLabel>
                                    <Select
                                        name="plan"
                                        placeholder="Select a plan"
                                        value={formValues.plan}
                                        onChange={(e) => handlePlanChange(e.target.value)}
                                    >
                                        <option value="Silver">Silver</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Premium">Premium</option>
                                    </Select>
                                    {errors.plan && (
                                        <Text color="red.500">{errors.plan}</Text>
                                    )}
                                </FormControl>
                            </HStack>



                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    name="address"
                                    placeholder="Enter your address"
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                />
                            </FormControl>

                            <Button colorScheme="teal" onClick={onFinish}>
                                Submit
                            </Button>

                            <Text mt={4} textAlign="center">
                                Already have an account?{" "}
                                <ChakraLink as={Link} to="/login" color="blue.500" fontWeight="bold">
                                    Log In
                                </ChakraLink>
                            </Text>
                        </Stack>
                    </form>
                )}
            </Card>
        </Box >
    );
};

export default Register;
