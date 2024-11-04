import React from 'react';
import { Box, Text, Stack, Heading, Button } from '@chakra-ui/react';
import AppPage from '../layouts/AppPage';

const Policy = () => {
    return (
        <AppPage title="Policies" description="" keywords={[]} isProtected={false}>
            <Box p={8}>
                <Heading as="h1" size="xl" mb={4}>
                    Policies
                </Heading>

                <Stack spacing={8}>
                    {/* Terms and Conditions */}
                    <Box borderWidth={1} borderRadius="md" p={4}>
                        <Heading as="h2" size="lg" mb={3}>
                            Terms & Conditions
                        </Heading>
                        <Text mb={4}>
                            This document is an electronic record in accordance with the Information Technology Act, 2000 and does not require physical or digital signatures. Published under Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011, these terms govern the use of the Platform https://www.impexinfo.com/ owned by AASHITA ENTERPRISES, located at Jhotwara Industrial Area RIICO, Jaipur, India. By using our Platform, you agree to be bound by these terms and conditions, forming a legal agreement with AASHITA ENTERPRISES. The terms "you" or "user" refer to anyone accessing the Platform, while "we" or "us" refer to AASHITA ENTERPRISES. We expect users to provide accurate information and take responsibility for all actions conducted under their account. 
                            Please be aware that our Platform may contain links to third-party websites, each governed by their own terms, which we do not control. Any unauthorized use of the Platform could result in action against you under these terms and applicable laws. By initiating any transaction through our Platform, you enter into a legally binding agreement with AASHITA ENTERPRISES. These terms and any disputes arising from them are subject to the jurisdiction of Jaipur, Rajasthan, and governed by the laws of India.
                        </Text>
                    </Box>

                    {/* Privacy Policy */}
                    <Box borderWidth={1} borderRadius="md" p={4}>
                        <Heading as="h2" size="lg" mb={2}>
                            Privacy Policy
                        </Heading>
                        <Text mb={4}>
                            This Privacy Policy outlines how we collect, use, and protect your personal information on our Platform. By accessing or using the Platform, you consent to these practices in accordance with Indian law. We collect information such as your name, contact details, and payment information, typically during account registration or transactions. This data enables us to provide the services you request, assist with orders, resolve any disputes, and offer marketing opportunities, from which you can opt out at any time. We may share your information within our group or with trusted third parties to support these services, comply with legal requirements, or for advertising purposes.
                            We employ standard security practices to safeguard your data, although we cannot guarantee complete security during internet transmission. Users are encouraged to maintain the confidentiality of their login details to prevent unauthorized access. Your data will be retained only as long as necessary to fulfill service obligations or comply with legal standards. You can access and update your information through your account settings at any time. Continued use of our Platform after updates to this policy indicates your acceptance of the changes.
                        </Text>
                    </Box>

                    {/* Contact Us */}
                    <Box borderWidth={1} borderRadius="md" p={4}>
                        <Heading as="h2" size="lg" mb={2}>
                            Contact Us
                        </Heading>
                        <Text mb={4}>
                            If you have any questions or concerns regarding these terms and policies, feel free to reach out to us. We are available via phone, email, or at our office location for any inquiries you may have.
                        </Text>
                        <Text mb={2}>
                            <strong>Phone:</strong>
                            <a href="tel:+919414075879" style={{ marginLeft: '5px' }}>
                                +91 9414075879
                            </a>
                        </Text>
                        <Text mb={2}>
                            <strong>Email:</strong>
                            <a href="mailto:info@impexinfo.com" style={{ marginLeft: '5px' }}>
                                info@impexinfo.com
                            </a>
                        </Text>
                        <Text mb={4}>
                            <strong>Address:</strong>
                            AASHITA ENTERPRISES, 149A, Jhotwara Industrial Area, Jaipur - 302012
                        </Text>
                    </Box>
                    
                    {/* More Details Button */}
                    <Box textAlign="center" mt={8}>
                        For more details, <a href="https://docs.google.com/document/d/1TPLyMI1xM8r5xdUEIEgasRu8rroxS2AGg78etkAmoAI/edit?usp=sharing" target="_blank" style={{ color: 'teal', textDecoration: 'underline' }}>click here</a>.
                    </Box>
                </Stack>
            </Box>
        </AppPage>
    );
};

export default Policy;
