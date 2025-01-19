// src/pages/NotFound.js
import React from 'react';
import { Box, Button, Text, Heading, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AppPage from "../layouts/AppPage.jsx"

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Redirect to the homepage or any valid route
  };

  return (
    
    <AppPage title="Not Found" description="" keywords={[]} isProtected={true}>
    <Center h="100vh" bg="gray.50">
      <Box textAlign="center" bg="white" p={8} rounded="lg" shadow="md">
        <Heading as="h1" size="2xl" mb={4} color="red.500">
          404
        </Heading>
        <Text fontSize="xl" color="gray.600" mb={6}>
          Oops! The page you are looking for doesn't exist.
        </Text>
        {/* <Button
          colorScheme="blue"
          size="lg"
          onClick={handleRedirect}
        >
          Go to Home
        </Button> */}
      </Box>
    </Center>
    </AppPage>
  );
};

export default NotFound;
