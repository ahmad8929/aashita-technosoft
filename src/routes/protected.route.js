// routes
import Landing from "../pages/Landing";
import Queries from "../pages/Queries";
import Tokens from "../pages/Tokens";
import Upgrade from "../pages/Upgrade/cards";
import Payments from "../pages/Upgrade/payment";
import ForgotPassword from "../components/SignUpLogin/forgotPassword";

export const protectedRoute = [
  {
    title: "landing",
    path: "/landing",
    component: Landing,
  },
  {
    title: "cards",
    path: "/upgrade",
    component: Upgrade,
  },
  {
    title: "Payment",
    path: "/payment",
    component: Payments,
  },
  {
    title: "queries",
    path: "/queries",
    component: Queries,
  },
  {
    title: "tokens",
    path: "/tokens",
    component: Tokens,
  },
  {
    title: "ForgotPassword",
    path: "/forgot-password",
    component: ForgotPassword,
  },
];
