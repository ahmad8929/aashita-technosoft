import React from "react";
import { Box, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from "@chakra-ui/react";

const PlanDetails = () => {
    return (
        <Box p={4}>
            <SimpleGrid columns={[1, null, 3]} spacing={4}>
                <Card p={4} borderRadius="md" boxShadow="md">
                    <CardHeader textAlign="center">
                        <Heading size="md">Trial Plan</Heading>
                        <Text fontSize="lg" color="blue.500" mt={2}>Free</Text>
                    </CardHeader>
                    <CardBody>
                        <Text>Access basic features with a trial period.</Text>
                    </CardBody>
                </Card>

                <Card p={4} borderRadius="md" boxShadow="md">
                    <CardHeader textAlign="center">
                        <Heading size="md">Diamond Plan</Heading>
                        <Text fontSize="lg" color="blue.500" mt={2}>Rs 80,000/year</Text>
                    </CardHeader>
                    <CardBody>
                        <Text>Unlock premium features and support.</Text>
                    </CardBody>
                </Card>

                <Card p={4} borderRadius="md" boxShadow="md">
                    <CardHeader textAlign="center">
                        <Heading size="md">Silver Plan</Heading>
                        <Text fontSize="lg" color="blue.500" mt={2}>Rs 1,00,000/year</Text>
                    </CardHeader>
                    <CardBody>
                        <Text>Access all premium features with priority support.</Text>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </Box>
    );
};

export default PlanDetails;