// routes
import Login from "../components/SignUpLogin/login";
import Signup from "../components/SignUpLogin/signup";
import forgot from "../components/SignUpLogin/forgotPassword";

export const publicRoutes = [

  {
    title: "login",
    path: "/login",
    component: Login,
  },
  {
    title: "signup",
    path: "/signup",
    component: Signup,
  },
  {
    title: "Forgot-Password",
    path: "/forgot",
    component: forgot,
  },
];
