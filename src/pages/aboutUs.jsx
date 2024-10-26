import React from 'react';
import { Box, Flex, Text, Stack, Heading } from '@chakra-ui/react';
import AppPage from '../layouts/AppPage';

const About = () => {
    return (
        <AppPage title="About Us" description="" keywords={[]} isProtected={false}>
            <Flex direction="column" p={8} align="center">
                <Box w={{ base: '100%', md: '80%' }} p={8} boxShadow="md" borderRadius="md" bg="white">
                    <Heading as="h1" size="xl" mb={6} textAlign="center">
                        About Aashita Enterprises
                    </Heading>

                    <Text fontSize="lg" mb={6} textAlign="center">
                        At Aashita Enterprises, we pride ourselves on our commitment to quality, reliability, and exceptional service. Our team works tirelessly to bring you the best solutions tailored to meet your needs.
                    </Text>

                    <Stack spacing={8}>
                        <Box>
                            <Heading as="h2" size="md" mb={4}>
                                Our Mission
                            </Heading>
                            <Text fontSize="md">
                                Our mission is to provide top-notch products and services that empower our customers to achieve their goals. We believe in building long-term partnerships and ensuring that every experience with us exceeds expectations.
                            </Text>
                        </Box>

                        <Box>
                            <Heading as="h2" size="md" mb={4}>
                                Our Vision
                            </Heading>
                            <Text fontSize="md">
                                We aim to be the leading service provider in our industry, known for our dedication to innovation and customer satisfaction. Through sustainable practices and continuous improvement, we strive to make a positive impact in our community and beyond.
                            </Text>
                        </Box>

                        <Box>
                            <Heading as="h2" size="md" mb={4}>
                                Our Values
                            </Heading>
                            <Text fontSize="md">
                                Integrity, quality, and teamwork are the core values that drive us. We are committed to upholding these principles in every aspect of our business, fostering a culture of respect and inclusivity.
                            </Text>
                        </Box>
                    </Stack>
                </Box>
            </Flex>
        </AppPage>
    );
};

export default About;
