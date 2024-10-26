import { Fragment, useEffect } from "react"
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// utils 
import sessionUtils from "../utils/session";

// components
import Navbar from "../components/Navbar";
import { setAuthState, setUser } from "../redux/slices/user";

const AppPage = ({ title, description = "", keywords = [], isProtected, includeNavbar = true, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userAuthState = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    const token = sessionUtils.sessionToken.getter();
    // TODO!  check for validation as well

    if (!token && isProtected) {
      // if token not there or invalid token
      navigate("/login");
    }

    if (token) {
      const tokenPayload = JSON.parse(token);
      const expTime = tokenPayload.session_expiration_time;
      const isTokenExpired = moment(expTime).isAfter(moment.now());

      if (isTokenExpired) {
        dispatch(setAuthState(false));
        window.localStorage.removeItem('session');
        navigate("/login");
      }

      dispatch(setUser(JSON.parse(token)));
      dispatch(setAuthState(true));
    }
  }, [location.pathname, userAuthState]);

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
