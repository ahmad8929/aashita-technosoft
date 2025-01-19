import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Divider, Spinner, Flex, HStack, Badge } from '@chakra-ui/react';
import axios from 'axios';

import AppPage from '../layouts/AppPage';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/user/index';

const Tokens = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [userLicenseType, setUserLicenseType] = useState("");
    const [userLicenseValid, setUserLicenseValid] = useState("");
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const userInfoResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userInfo`, {
                headers: { 'Session-Token': user.session_token, },
            });
            setLoading(false);
            const userLicenseType = userInfoResponse.data.user_details.LicenseType;
            setUserLicenseType(userLicenseType);

            const userLicenseValid = userInfoResponse.data.user_details.LicenseValidTill;
            setUserLicenseValid(userLicenseValid);

        } catch (error) {
            if (error.response.data.code === "SESSION_ABSENT" || error.response.data.code === "SESSION_EXPIRED" || error.response.data.code === "SESSION_TOKEN_MISSING") {
                setLoading(false);
                dispatch(clearUser());
                navigate("/login");
            } else {
                console.error("Error fetching :", error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.sessionToken, dispatch]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <AppPage title="Tokens" description="" keywords={[]} isProtected={true}>
            {isLoading ? (
                <Flex
                    position="fixed"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(255, 255, 255, 0.8)"
                    zIndex="1000"
                >
                    <Spinner size="xl" />
                </Flex>
            ) : (
                // <Box p={8} bg="gray.100" minH="100vh">
                    <Box p={[4, 8]} bg="gray.100" minH="calc(100vh - 9vh)">

                    <VStack spacing={6} align="stretch" maxW="600px" mx="auto">
                        <Heading size="lg" textAlign="center">My Plan Details</Heading>
                        <Divider />
                        <Flex
                            p={6}
                            bg="white"
                            borderRadius="md"
                            shadow="md"
                            align="center"
                            justify="space-between"
                            flexWrap="wrap"
                        >
                            <HStack spacing={4}>
                                <Text fontWeight="bold" fontSize="lg" color="black">
                                    My Plan: <span style={{ color: "#3182ce", textTransform: "capitalize" }}>{userLicenseType.toLowerCase()}</span>
                                </Text>
                            </HStack>


                        </Flex>

                        <Flex
                            p={6}
                            bg="white"
                            borderRadius="md"
                            shadow="md"
                            align="center"
                            justify="space-between"
                            flexWrap="wrap"
                        >
                            <HStack spacing={4}>
                                <Text fontWeight="bold" fontSize="lg" color="black">
                                    Valid Till: <span style={{ color: "#3182ce" }}>{formatDate(userLicenseValid)}</span>
                                </Text>
                            </HStack>

                        </Flex>
                    </VStack>
                </Box>
            )}
        </AppPage>
    );
};

export default Tokens;
