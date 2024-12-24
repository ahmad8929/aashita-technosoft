// routes
import Login from "../pages/login";
import Signup from "../pages/signup";
import forgot from "../pages/forgotPassword";
import Activation from "../pages/activation";
import ResetPassword from "../pages/resetPassword";
import AboutUs from "../pages/AboutUs";
import NotFound from "../pages/notFound";


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
    title: "about",
    path: "/about",
    component: AboutUs,
  },
  {
    title: "Forgot-Password",
    path: "/forgot-password",
    component: forgot,
  },
  {
    title: "Account Activation",
    path: "/account-activate",
    component: Activation,
  },
  {
    title: "Reset Password",
    path: "/reset-password",
    component: ResetPassword,
  },
  {
    title: "Not Found",
    path: "/*",
    component: NotFound,
  },
];