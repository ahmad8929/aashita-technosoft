// routes
import Landing from "../pages/Landing";
import Queries from "../pages/Queries";
import Tokens from "../pages/Tokens";
import Contact from "../pages/Contact";
import Upgrade from "../pages/cards";
import Payments from "../pages/payment";
import About from "../pages/aboutUs";

export const protectedRoute = [
  {
    title: "Home",
    path: "/",
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
    title: "contact",
    path: "/contact",
    component: Contact,
  },
  {
    title: "about",
    path: "/about",
    component: About,
  },
];
