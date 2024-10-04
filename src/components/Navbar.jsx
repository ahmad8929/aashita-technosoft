import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, Text, HStack } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { clearUser } from '../redux/slices/index'; // Import the clearUser action

const Navbar = () => {
    const dispatch = useDispatch();

    // Select isLoggedIn and userName from Redux store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userName = useSelector((state) => state.user.user?.name || "User");

    // Handle logout
    const handleLogout = () => {
        dispatch(clearUser()); // Clear user data and set isLoggedIn to false
    };

    return (
        <Box bg="gray.100" px={4} py={3} boxShadow="md" position="sticky" top={0} zIndex={100}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Text fontSize="xl" fontWeight="bold" color="blue.500">Aashita Enterprises</Text>
                </Link>

                <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Text fontSize="md" fontWeight="medium" color="gray.700" _hover={{ color: "blue.500" }}>Home</Text>
                    </Link>
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <Text fontSize="md" fontWeight="medium" color="gray.700" _hover={{ color: "blue.500" }}>Products</Text>
                    </Link>
                    <Link to="/about" style={{ textDecoration: "none" }}>
                        <Text fontSize="md" fontWeight="medium" color="gray.700" _hover={{ color: "blue.500" }}>About</Text>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: "none" }}>
                        <Text fontSize="md" fontWeight="medium" color="gray.700" _hover={{ color: "blue.500" }}>Contact</Text>
                    </Link>
                </HStack>

                {!isLoggedIn ? (
                    <Button
                        as={Link}
                        to="/login"
                        colorScheme="blue"
                        variant="outline"
                        borderRadius="full"
                        size="md"
                        _hover={{ bg: "blue.500", color: "white" }}
                    >
                        Log In
                    </Button>
                ) : (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<Avatar size="sm" name={userName} bg="blue.500" color="white" />}
                            variant="link"
                            cursor="pointer"
                        >
                            <ChevronDownIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={Link} to="/past-requests">Past Requests</MenuItem>
                            <MenuItem as={Link} to="/tokens">My Tokens</MenuItem>
                            <MenuItem as={Link} to="/upgrade">Upgrade</MenuItem>
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem> {/* Handle logout */}
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;
