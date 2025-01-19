import React from 'react'
import { Box, Flex, Text, Heading, List, ListItem } from '@chakra-ui/react';
import AppPage from '../layouts/AppPage';

const AboutUs = () => {
    return (
        <AppPage title="About Us" description="" keywords={[]} isProtected={true}>

            <Flex direction="column" pt={6} pb={4} align="center">
                <Box w={{ base: '100%', md: '90%', lg: '80%' }} bg="white">

                    <Heading as="h1" size="xl" mb={4} textAlign="center" bg="gray.100">
                        About ImpexInfo.com
                    </Heading>

                    <Text fontSize="lg" mb={6} textAlign="center">
                        We are part of Aashita Enterprises, a B2B consultancy firm dedicated to helping organizations grow their business by analyzing data to optimize purchase prices for buyers and sales prices for sellers.
                    </Text>

                    <Text fontSize="md" mb={4}>
                        ImpexInfo.com provides deeper insights into export-import business and supply chain opportunities. With our research data, you can:
                    </Text>

                    <List spacing={3} pl={6} fontSize="md">
                        <ListItem>1. Transform export-import intelligence data into actionable insights and knowledge.</ListItem>
                        <ListItem>2. Make confident business decisions with our ready-to-use reports, which uniquely include accurate Customs Duty and IGST details separately for imports, along with landed prices.</ListItem>
                        <ListItem>3. Uncover new insights such as:</ListItem>
                        <List pl={4} styleType="disc" fontSize="md">
                            <ListItem> Finding reliable buyers and suppliers</ListItem>
                            <ListItem> Discovering new markets and promising products</ListItem>
                            <ListItem> Tracking competitors  moves</ListItem>
                            <ListItem> Analyzing demand and supply trends</ListItem>
                            <ListItem> Determining optimal product prices</ListItem>
                            <ListItem> Saving on custom duties</ListItem>
                            <ListItem> Gaining strategic information for a competitive edge</ListItem>
                        </List>
                    </List>

                    <Box mt={6}>
                        <Text fontSize="md" fontWeight="bold" mb={2}>Disclaimer</Text>
                        <Text fontSize="md">
                            Our Export & Import Trade Intelligence reports are gathered from available online and offline sources. We do not guarantee the authenticity or originality of this data. Clients are advised to use our research data at their own discretion. We are not responsible for any matter related to use of our reports. Further no one will recirculate or publicise these reports in any form online or offline.
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </AppPage>
    )
}

export default AboutUs