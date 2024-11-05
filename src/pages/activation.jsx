import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Button, Spinner, Text, useToast } from "@chakra-ui/react";


const AccountActivation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [status, setStatus] = useState("loading");

  // Extract the token from the URL's query parameters
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/account-activate?token=${token}`);
        setStatus("success");
        toast({
          title: "Account activated!",
          description: "Your account has been successfully activated.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        setStatus("error");
        toast({
          title: "Activation failed",
          description: error?.response?.data?.message || "Invalid or expired token.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };

    if (token) activateAccount();
  }, [token, toast]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      {status === "loading" ? (
        <Spinner size="lg" />
      ) : (
        <Box textAlign="center">
          <Text fontSize="2xl" mb={4}>
            {status === "success"
              ? "Your account has been activated!"
              : "Activation failed"}
          </Text>
          <Button colorScheme="teal" onClick={handleLoginRedirect}>
            Go to Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AccountActivation;
