// routes
import Products from "../pages/Products";
import LoginSignup from "../components/SignUpLogin/SignUpLogin";
import forgot from "../components/SignUpLogin/forgotPassword";

export const publicRoutes = [
  {
    title: "Product",
    path: "/products",
    component: Products,
  },
  {
    title: "loginSignp",
    path: "/login",
    component: LoginSignup,
  },
  {
    title: "Forgot-Password",
    path: "/forgot",
    component: forgot,
  },
];
