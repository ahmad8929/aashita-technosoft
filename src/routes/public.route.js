// routes
import Login from "../pages/login";
import Signup from "../pages/signup";
import forgot from "../pages/forgotPassword";
import Activation from "../pages/activation";
import ResetPassword from "../pages/resetPassword";
<<<<<<< HEAD
import AboutUs from "../pages/AboutUs";
import NotFound from "../pages/notFound";
=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29


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
<<<<<<< HEAD
    title: "about",
    path: "/about",
    component: AboutUs,
  },
  {
=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
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
<<<<<<< HEAD
  {
    title: "Not Found",
    path: "/*",
    component: NotFound,
  },
=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
];