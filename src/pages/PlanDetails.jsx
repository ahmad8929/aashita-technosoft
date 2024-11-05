import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Card, CardHeader, CardBody, Text, Heading, Spinner, Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from 'react-redux';

const PlanDetails = () => {
    const user = useSelector((state) => state.user);
    const [plans, setPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const fetchPlanData = async () => {
        const sessionToken = user.sessionToken;

        try {
            const licenseResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/license`, {
                headers: { 'Session-Token': sessionToken },
            });
            setPlans(licenseResponse.data);

            const userInfoResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userinfo`, {
                headers: { 'Session-Token': sessionToken },
            });
            setCurrentPlan(userInfoResponse.data.currentPlan);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error loading plans",
                description: "Could not load plan information. Please try again later.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchPlanData();
    }, [user.sessionToken]);

    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Box p={4}>
            <Tabs variant="enclosed" colorScheme="blue">
                <TabList>
                    <Tab>Available Plans</Tab>
                    <Tab>Current Plan</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <SimpleGrid columns={[1, null, 3]} spacing={4}>
                            {plans.map((plan) => (
                                <Card key={plan.id} p={4} borderRadius="md" boxShadow="md">
                                    <CardHeader textAlign="center">
                                        <Heading size="md">{plan.name}</Heading>
                                        <Text fontSize="lg" color="blue.500" mt={2}>{plan.price}</Text>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>{plan.description}</Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </TabPanel>

                    <TabPanel>
                        <Box textAlign="center" p={4}>
                            {currentPlan ? (
                                <>
                                    <Heading size="md">Your Current Plan: {currentPlan.name}</Heading>
                                    <Text fontSize="lg" color="blue.500" mt={2}>{currentPlan.price}</Text>
                                    <Text mt={4}>{currentPlan.description}</Text>
                                </>
                            ) : (
                                <Text>No active plan found.</Text>
                            )}
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default PlanDetails;
