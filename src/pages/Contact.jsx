import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Flex,
    Stack,
    Text,
    Icon,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa'; // for the address icon
import AppPage from '../layouts/AppPage';

const Contact = () => {
    return (
        <AppPage title="Contact" description="" keywords={[]} isProtected={true}>
            <Flex direction={{ base: 'column', md: 'row' }} p={8} justify="center">
                {/* Left side - Contact Form */}
                <Box
                    w={{ base: '100%', md: '60%' }}
                    p={8}
                    boxShadow="md"
                    borderRadius="md"
                    bg="white"
                >
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        Send Your Message
                    </Text>
                    <Text mb={6}>
                        In case of any queries or requirements, please leave us a message,
                        and our team will reach out to you.
                    </Text>

                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Enter your name" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Enter your email" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Contact Number</FormLabel>
                            <Input placeholder="Enter your contact number" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Message</FormLabel>
                            <Textarea placeholder="Enter your message" />
                        </FormControl>

                        <Button colorScheme="blue" mt={4}>
                            Submit Now
                        </Button>
                    </Stack>
                </Box>

                {/* Right side - Contact Info and Google Map */}
                <Box
                    w={{ base: '100%', md: '35%' }}
                    p={8}
                    ml={{ md: 8 }}
                    mt={{ base: 8, md: 0 }}
                    boxShadow="md"
                    borderRadius="md"
                    bg="white"
                >
                    <Text fontSize="xl" fontWeight="bold" mb={6}>
                        You Can Reach Out To Us Through The Following
                    </Text>

                    <Stack spacing={6}>
                        <Flex align="center">
                            <Icon as={PhoneIcon} boxSize={5} mr={3} />
                            <a href="tel:+919414075879" style={{ marginLeft: '5px' }}>
                                +91 9414075879
                            </a>
                        </Flex>

                        <Flex align="center">
                            <Icon as={EmailIcon} boxSize={5} mr={3} />
                            <a href="mailto:info@impexinfo.com" style={{ marginLeft: '5px' }}>
                                info@impexinfo.com
                            </a>
                        </Flex>

                        <Flex align="center">
                            <Icon as={FaMapMarkerAlt} boxSize={5} mr={3} />
                            <Text>
                                Aashita Enterprises, 149A, Road No. 12, Jhotwara Industrial Area
                                Jaipur - 302012
                            </Text>
                        </Flex>
                    </Stack>

                    {/* Google Map Embed */}
                    {/* <Box mt={8}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.16907024534!2d75.75110177555564!3d26.96154477661815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db35d77ac7ea1%3A0xc8a39b4c38100e3c!2sAashita%20Enterprises!5e0!3m2!1sen!2sin!4v1728361048116!5m2!1sen!2sin"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </Box> */}
                </Box>
            </Flex>
        </AppPage>
    );
};

export default Contact;
