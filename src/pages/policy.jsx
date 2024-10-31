import React from 'react';
import { Box, Text, Stack, Heading } from '@chakra-ui/react';
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
                            Terms and Conditions
                        </Heading>
                        <Text mb={4}>
                            This website is operated by AASHITA ENTERPRISES. These Terms and Conditions govern your access to and use of our website and services. By accessing our site, you agree to be bound by these terms. If you do not agree, please refrain from using our services. You must be at least the age of majority in your jurisdiction to use our services and agree not to engage in any unlawful activities or violate any laws. Certain products or services may be available exclusively online and may have limited quantities, subject to return or exchange only according to our Return Policy.
                        </Text>
                        <Text mb={4}>
                            We strive to provide accurate information regarding our products and services; however, we do not guarantee the authenticity or originality of any data, particularly concerning our Export & Import Trade Intelligence reports. Clients are advised to use this data based on their own judgment and discretion. We reserve the right to modify or discontinue our services at any time without notice, and prices and descriptions of products may change at our sole discretion. Additionally, we reserve the right to limit sales of our products or services to any individual, geographic region, or jurisdiction on a case-by-case basis.
                        </Text>
                        <Text mb={4}>
                            Our services are provided "as is" without warranties of any kind. We do not guarantee that the quality of products or services will meet your expectations or that any errors in the service will be corrected. In no event shall AASHITA ENTERPRISES be liable for any direct or indirect damages arising from your use of our services. You agree to indemnify and hold AASHITA ENTERPRISES harmless from any claims arising from your violation of these terms. These terms shall be governed by the laws of India, with any disputes subject to the jurisdiction of Jaipur, Rajasthan. We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes made.
                        </Text>
                    </Box>

                    {/* Refund Policy */}
                    <Box borderWidth={1} borderRadius="md" p={4}>
                        <Heading as="h2" size="lg" mb={2}>
                            Refund Policy
                        </Heading>
                        <Text mb={4}>
                            Our services are provided for a specific subscription period and are non-refundable once payment is made. It is crucial to review the Terms and Conditions prior to making a payment. If services cannot be provided due to changes in policy or government regulations, the subscription fee will not be refundable.
                        </Text>
                    </Box>

                    {/* Privacy Policy */}
                    <Box borderWidth={1} borderRadius="md" p={4}>
                        <Heading as="h2" size="lg" mb={2}>
                            Privacy Policy
                        </Heading>
                        <Text mb={4}>
                            Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our services. We may collect personal information such as your name, email address, and payment details when you register or make a purchase. We do not sell or rent your personal information to third parties.
                        </Text>
                        <Text mb={4}>
                            Your information is used to process transactions, improve our services, and communicate with you about your account or services. We implement a variety of security measures to maintain the safety of your personal information, and all sensitive information is transmitted via Secure Socket Layer (SSL) technology. We may update this Privacy Policy from time to time, and your continued use of the services after any changes indicates your acceptance of the new terms.
                        </Text>
                    </Box>

                    {/* Contact Us */}
                    <Box borderWidth={1} borderRadius="md" p={4}>
                        <Heading as="h2" size="lg" mb={2}>
                            Contact Us
                        </Heading>
                        <Text mb={4}>
                            If you have any questions or concerns regarding our policies, please feel free to reach out to us. You can contact us at:
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
                            <strong>Address: </strong>

                            Aashita Enterprises, 149A, Jhotwara Industrial Area
                            Jaipur - 302012
                        </Text>
                    </Box>
                </Stack>
            </Box>
        </AppPage>
    );
};

export default Policy;
