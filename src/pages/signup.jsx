import React, { useState } from "react";
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
    Link as ChakraLink,
    IconButton,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { useSignupMutation } from "../redux/api/auth/slice";

const Register = () => {
    // const [handleSignup, { isLoading }] = useSignupMutation();
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlanChange = (value) => {
        setFormValues((prev) => ({ ...prev, plan: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.fullName) newErrors.fullName = "Full Name is required.";
        if (!formValues.email) newErrors.email = "Email is required.";
        if (!formValues.mobileNumber) newErrors.mobileNumber = "Mobile Number is required.";
        if (!formValues.password) newErrors.password = "Password is required.";
        if (formValues.password !== formValues.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        if (!formValues.plan) newErrors.plan = "Plan selection is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitSignupForm = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            // try {
            //     await handleSignup({
            //         email: formValues.email,
            //         phoneNumber: formValues.mobileNumber,
            //         password: formValues.password,
            //         companyName: formValues.companyName,
            //         licenseType: formValues.plan,
            //     }).unwrap();
            //     // Optionally, handle successful signup (e.g., redirect, show message)
            // } catch (error) {
            //     // Handle error here (e.g., show error message)
            //     console.error("Signup failed", error);
            // }
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" overflow="hidden">
            <Card p={6} w={screens === "Mobile" ? "100%" : "700px"} boxShadow="lg">
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Now, tell us a bit about yourself
                </Heading>

                {isLoading ? (
                    <Spinner size="lg" />
                ) : (
                    <form onSubmit={submitSignupForm}>
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

                            <Button colorScheme="teal" type="submit">
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
        </Box>
    );
};

export default Register;
