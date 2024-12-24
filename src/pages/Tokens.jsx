import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Divider, Spinner, Flex } from '@chakra-ui/react';
import axios from 'axios';

import AppPage from '../layouts/AppPage';

<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

import { clearUser } from '../redux/slices/user/index';

const Tokens = () => {
    const navigate = useNavigate();
    
        const dispatch = useDispatch();
=======
import { useSelector } from 'react-redux';

const Tokens = () => {
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
    const user = useSelector((state) => state.user);
    const [totalTokens, setTotalTokens] = useState(0);
    const [userLicenseType, setUserLicenseType] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [tokensData, setTokensData] = useState({
        totalTokens: 0,
        startTime: '',
        endTime: '',
        userId: ''
    });

    const fetchData = async () => {


        try {
            const sessionToken = user.sessionToken;

            // Fetching user information first
            const userInfoResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userInfo`, {
<<<<<<< HEAD
                headers: {   'Session-Token': user.session_token, },
=======
                headers: { 'Session-Token': sessionToken },
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            });

            const userLicenseType = userInfoResponse.data.user_details.LicenseType;
            setUserLicenseType(userLicenseType);

            // Fetching license data based on user's LicenseType
            const licenseResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/license`, {
<<<<<<< HEAD
                headers: {   'Session-Token': user.session_token, },
=======
                headers: { 'Session-Token': sessionToken },
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            });

            // Filter license data to match the user's LicenseType and set total tokens
            const matchingLicense = licenseResponse.data.find(
                (license) => license.LicenseType === userLicenseType
            );
            if (matchingLicense) {
                setTotalTokens(matchingLicense.NumberOfRowsPerPeriod);
            }

            setLoading(false);
<<<<<<< HEAD
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        //     setLoading(false);
        // }
         } catch (error) {
                        if (error.response && error.response.data && error.response.data.code === "SESSION_ABSENT") {
        
                            console.log("------User Data before clear-------", user);
        
                            dispatch(clearUser());
                            console.log("------User Data after clear-------", user);
        
                            // alert("Something went wrong. Please log in again.");
                            dispatch(clearUser());
                            navigate("/login");
                            dispatch(clearUser());
        
                        } else {
                            console.error("Error fetching :", error);
                        }
                    }
=======
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
    };

    useEffect(() => {
        fetchData();
<<<<<<< HEAD
    }, [user.sessionToken,dispatch]);
=======
    }, [user.sessionToken]);
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29


    // Fetch token data from API
    useEffect(() => {
        const fetchTokenData = async () => {
            const sessionToken = user.sessionToken;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tokens`, {
                    headers: {
<<<<<<< HEAD
                        'Session-Token': user.session_token,
=======
                        'Session-Token': sessionToken,
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
                    },
                });

                const { tokens, startTime, endTime, userId } = response.data;
                setTokensData({
                    totalTokens: tokens,
                    startTime: new Date(startTime).toLocaleString(),
                    endTime: new Date(endTime).toLocaleString(),
                    userId: userId,
                });
            } catch (error) {
                console.error("Error fetching token data:", error);

            }
        };

        fetchTokenData();
    }, [user.sessionToken]);

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

                <Box p={8} bg="gray.100" minH="100vh">
                    <VStack spacing={6} align="stretch" maxW="800px" mx="auto">
                        <Heading size="lg" textAlign="center">Todays Record</Heading>
                        <Divider />

                        {userLicenseType !== "TRIAL" && (
                            <>
                                <Box bg="white" p={6} borderRadius="md" shadow="md">
                                    <Text fontSize="xl" mb={4}>Next working after 24 hr</Text>
                                </Box>
                                <Box bg="white" p={6} borderRadius="md" shadow="md">
                                    <Text fontSize="xl" mb={4}>Used Record for Today</Text>
                                    <Text fontSize="2xl" fontWeight="bold">{totalTokens - tokensData.totalTokens}</Text>
                                </Box>

                            </>
                        )}

                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Text fontSize="xl" mb={4}>Remaining Records</Text>
                            <Text fontSize="2xl" fontWeight="bold">{tokensData.totalTokens}</Text>
                        </Box>
                    </VStack>
                </Box>
            )}
        </AppPage>
    );
};

export default Tokens;
