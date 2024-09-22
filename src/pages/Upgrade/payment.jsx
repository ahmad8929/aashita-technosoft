import React from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Text, Stack } from '@chakra-ui/react';

const PaymentPage = () => {
    return (
        <Box p={8} bg="gray.100" minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={6} bg="white" p={8} borderRadius="md" boxShadow="lg" width="100%" maxW="500px">
                <Heading size="lg" mb={6}>Payment Information</Heading>

                <Stack spacing={4} width="100%">
                    <FormControl id="cardName" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Name" />
                    </FormControl>

                    <FormControl id="cardNumber" isRequired>
                        <FormLabel>Card Number</FormLabel>
                        <Input placeholder="1234 5678 9101 1121" />
                    </FormControl>

                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <FormControl id="expiryDate" isRequired>
                            <FormLabel>Expiry Date</FormLabel>
                            <Input placeholder="MM/YY" />
                        </FormControl>

                        <FormControl id="cvv" isRequired>
                            <FormLabel>CVV</FormLabel>
                            <Input placeholder="... " />
                        </FormControl>
                    </Stack>
                </Stack>

                <Button colorScheme="blue" width="full" mt={6}>
                    Pay Now
                </Button>

                <Text fontSize="sm" color="gray.500" mt={3}>
                    Your payment details are securely processed.
                </Text>
            </VStack>
        </Box>
    );
}

export default PaymentPage;
