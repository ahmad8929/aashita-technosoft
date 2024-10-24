import { Fragment, useEffect } from "react"
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// utils 
import sessionUtils from "../utils/session";

// components
import Navbar from "../components/Navbar";

const AppPage = ({ title, description = "", keywords = [], isProtected, includeNavbar = true, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionUtils.sessionToken.getter();
    // TODO!  check for validation as well

    if (!token && isProtected) {
      // if token not there or invalid token
      navigate("/login");
    }
  }, [location.pathname]);

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(',')} />
      </Helmet>

      {includeNavbar ? <Navbar /> : null}
      {children}
    </Fragment>
  )
}

export default AppPage;
