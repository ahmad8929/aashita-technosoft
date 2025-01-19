import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    Text,
    HStack
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { clearUser, setAuthState } from '../../redux/slices/user';
import MenuItems from "./menuItem";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Extracting values from Redux store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userName = useSelector((state) => state.user.name || ""); // Fetch Name from Redux

    // Handle logout
    const handleLogout = () => {
        dispatch(clearUser());
        window.localStorage.removeItem('session'); // Clear session from localStorage
        dispatch(setAuthState(false)); // Update auth state
        navigate("/"); // Redirect to the homepage
    };
    
    return (
        <Box bg="gray.100" px={4} py={3} boxShadow="md" position="sticky" top={0} zIndex={100}>
            <Flex h={8} alignItems="center" justifyContent="space-between">
                {/* Logo or Home Link */}
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Text fontSize="xl" fontWeight="bold" color="blue.500">
                        {userName}
                    </Text>
                </Link>

                {/* Navigation Links */}
                <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
                    {MenuItems.map((item) => (
                        <Link key={item.href} to={item.href} style={{ textDecoration: "none" }}>
                            <Text fontSize="md" fontWeight="medium" color="gray.700" _hover={{ color: "blue.500" }}>
                                {item.title}
                            </Text>
                        </Link>
                    ))}
                </HStack>

                {/* Authentication Buttons */}
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
                            <MenuItem as={Link} to="/queries">Past Requests</MenuItem>
                            <MenuItem as={Link} to="/tokens">My Tokens</MenuItem>
                            <MenuItem as={Link} to="/myPlan">My Plan</MenuItem>
                            <MenuItem as={Link} to="/upgrade">Upgrade</MenuItem>
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;
