import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Button, Spinner, Text, useToast, Input, VStack } from "@chakra-ui/react";

const AccountActivation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [status, setStatus] = useState("loading");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

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
          description: "Invalid or expired token.",
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

  const handleResendActivation = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to resend the activation link.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsResending(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/resend-activation`, { email });
      toast({
        title: "Activation link sent!",
        description: "A new activation link has been sent to your email.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Resend failed",
        description: "Email already activated",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      {status === "loading" ? (
        <Spinner size="lg" />
      ) : (
        <Box textAlign="center">
          {status === "success" ? (
            <>
              <Text fontSize="2xl" mb={4}>Your account has been activated!</Text>
              <Button colorScheme="teal" onClick={handleLoginRedirect}>
                Go to Login
              </Button>
            </>
          ) : (
            <VStack spacing={4}>
              <Text fontSize="2xl">Activation failed</Text>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                colorScheme="teal"
                onClick={handleResendActivation}
                isLoading={isResending}
              >
                Resend Activation Link
              </Button>
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AccountActivation;
