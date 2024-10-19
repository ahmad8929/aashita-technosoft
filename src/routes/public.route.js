// routes
import Login from "../pages/login";
import Signup from "../pages/signup";
import forgot from "../pages/forgotPassword";

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
