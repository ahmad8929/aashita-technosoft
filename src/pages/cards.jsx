import React from 'react';
import { Box, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AppPage from '../layouts/AppPage';

const Cards = () => {
    const navigate = useNavigate();

    const handleChoosePlan = () => {
        navigate('/payment');
    };

    return (
        <AppPage title="Cards" description="" keywords={[]} isProtected={true}>
            <Box p={8} bg="gray.100" minH="calc(100vh - 14vh)" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={10} align="stretch" maxW="800px" width="100%">
                <SimpleGrid spacing={8} templateColumns="repeat(3, 1fr)">
                        <Card
                            p={6}
                            width="300px"
                            borderRadius="md"
                            boxShadow="md"
                            transition="transform 0.3s, box-shadow 0.3s"
                            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                        >
                            <CardHeader textAlign="center">
                                <Heading size='lg'>Trial Plan</Heading>
                                <Text fontSize="2xl" color="blue.500" mt={2}>Free</Text>
                            </CardHeader>
                            <CardBody textAlign="center">
                                <Text>Get started with our Trial Plan today.</Text>
                            </CardBody>
                            <CardFooter justifyContent="center">
                                <Button colorScheme="blue" onClick={handleChoosePlan}>Choose Trial</Button>
                            </CardFooter>
                        </Card>

                        <Card
                            width="300px"
                            p={6}
                            borderRadius="md"
                            boxShadow="md"
                            transition="transform 0.3s, box-shadow 0.3s"
                            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                        >
                            <CardHeader textAlign="center">
                                <Heading size='lg'>Diamond Plan</Heading>
                                <Text fontSize="2xl" color="blue.500" mt={4} >Rs 80,000/year</Text>
                            </CardHeader>
                            <CardBody textAlign="center">
                                <Text>Access premium features with the Diamond Plan.</Text>
                            </CardBody>
                            <CardFooter justifyContent="center">
                                <Button colorScheme="blue" onClick={handleChoosePlan}>Choose Dimond</Button>
                            </CardFooter>
                        </Card>

                        <Card

                            width="300px"
                            p={6}
                            borderRadius="md"
                            boxShadow="md"
                            transition="transform 0.3s, box-shadow 0.3s"
                            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                        >
                            <CardHeader textAlign="center">
                                <Heading size='lg'>Silver Plan</Heading>
                                <Text fontSize="2xl" color="blue.500" mt={2}>Rs 1,00,000/year</Text>
                            </CardHeader>
                            <CardBody textAlign="center">
                                <Text>Access all premium features with the Silver Plan.</Text>
                            </CardBody>
                            <CardFooter justifyContent="center">
                                <Button colorScheme="blue" onClick={handleChoosePlan}>Choose Silver</Button>
                            </CardFooter>
                        </Card>
                    </SimpleGrid>
                </VStack>
            </Box>
        </AppPage>
    );
}

export default Cards;
