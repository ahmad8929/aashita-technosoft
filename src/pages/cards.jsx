import React, { useEffect, useState } from 'react';
import { Box, VStack, SimpleGrid, Card, CardHeader, Flex, CardBody, CardFooter, Heading, Text, Button, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AppPage from '../layouts/AppPage';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Cards = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [cards, setCards] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [hasShownToast, setHasShownToast] = useState(false);
    const toast = useToast();

    // Fetching card data from the license API and userInfo API
    const fetchData = async () => {

        if (!user.isLoggedIn && !hasShownToast) {
            toast({
                title: "Login Required",
                description: "You must be logged in to view the cards.",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top"
            });
            setHasShownToast(true);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
            return;
        }


        try {
            const sessionToken = user.sessionToken;

            // Fetching card data from the license API
            const licenseResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/license`, {
                headers: { 'Session-Token': sessionToken },
            });

            // Sort cards to show "TRIAL" first, followed by "Silver" and "Gold"
            const sortedCards = licenseResponse.data.sort((a, b) => {
                const order = { TRIAL: 1, SILVER: 2, GOLD: 3 };
                return order[a.LicenseType] - order[b.LicenseType];
            });
            setCards(sortedCards);

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userInfo`, {
                headers: {
                    'Session-Token': user.sessionToken,
                },
            });
            setCurrentPlan(response.data.user_details.LicenseType);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.sessionToken]);

    const handleChoosePlan = (licenseType) => {
        navigate('/payment', { state: { licenseType } });
    };

    // if (loading) {
    //      <Spinner size="xl" />;
    // }

    return (
        <AppPage title="Cards" description="" keywords={[]} isProtected={true}>

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

            <Box p={8} bg="gray.100" minH="calc(100vh - 14vh)" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={10} align="stretch" maxW="800px" width="100%">
                    <SimpleGrid spacing={8} templateColumns="repeat(3, 1fr)">

                        {cards
                            .filter((card) => {
                                // If current plan is "TRIAL", show all cards
                                if (currentPlan === "TRIAL") {
                                    return true;  // show all cards
                                }

                                // If current plan is not "TRIAL", hide the "TRIAL" card
                                return card.LicenseType !== "TRIAL";  // show only non-TRIAL cards
                            })
                            .map((card) => (
                                <Card
                                    key={card.LicenseType}
                                    p={6}
                                    width="300px"
                                    borderRadius="md"
                                    boxShadow="md"
                                    transition="transform 0.3s, box-shadow 0.3s"
                                    _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                                >
                                    <CardHeader textAlign="center">
                                        <Heading size='lg'>{card.LicenseType}</Heading>
                                        {card.LicenseType !== "TRIAL" && (
                                            <Text fontSize="2xl" color="blue.500" mt={2}>Total Price: {card.TotalPrice}</Text>
                                        )}
                                    </CardHeader>
                                    <CardBody textAlign="center">
                                        {card.LicenseType === "TRIAL" ? (
                                            <CardBody textAlign="center" display="flex" alignItems="center" justifyContent="center" height="150px">
                                                <Text>No. of Records: {card.NumberOfRowsPerPeriod}</Text>
                                            </CardBody>
                                        ) : (
                                            <>
                                                <Text>Base Price: {card.BasePrice}</Text>
                                                <Text>GST: {card.Gst}%</Text>
                                                <Text>Records Per Day: {card.NumberOfRowsPerPeriod}</Text>
                                                <Text>Validity: 12 Months from the date of payment</Text>
                                            </>
                                        )}
                                    </CardBody>
                                    <CardFooter justifyContent="center">
                                        {currentPlan === card.LicenseType ? (
                                            <Text color="green.500" fontWeight="bold">Active Plan</Text>
                                        ) : (
                                            <Button colorScheme="blue" onClick={() => handleChoosePlan(card.LicenseType)}>
                                                Choose {card.LicenseType}
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}

                    </SimpleGrid>
                </VStack>
            </Box>
        </AppPage>
    );
};

export default Cards;
