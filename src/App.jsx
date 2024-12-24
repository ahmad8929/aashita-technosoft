import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setAuthState, clearUser } from "./redux/slices/user";
import { getAccessToken } from "./utils/session";
=======

>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
// routes
import routes from "./routes";

function App() {
<<<<<<< HEAD
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const sessionExpirationTime = localStorage.getItem("session_exp_time");
      if (sessionExpirationTime) {
        const currentTimestamp = new Date().getTime();
        const expirationTimestamp = new Date(sessionExpirationTime).getTime();

        if (currentTimestamp < expirationTimestamp) {
          dispatch(setUser({ session_token: token, session_exp_time: sessionExpirationTime }));
          dispatch(setAuthState(true));
        } else {
          dispatch(clearUser());
          // dispatch(setAuthState(false));
          localStorage.removeItem("session");
          alert("Session expired. Please log in again.");
          // navigate("/login");
        }
      }
    }
  }, [dispatch]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//         const token = getAccessToken();
//         if (token) {
//             const sessionExpirationTime = localStorage.getItem("session_exp_time");
//             const currentTimestamp = new Date().getTime();
//             const sessionExpirationTimestamp = new Date(sessionExpirationTime).getTime();

//             if (currentTimestamp >= sessionExpirationTimestamp) {
//                 dispatch(clearUser());
//                 dispatch(setAuthState(false));
//                 localStorage.removeItem("session");
//                 alert("Session expired. Please log in again.");
//                 window.location.href = "/login"; // Redirect to login
//             }
//         }
//     }, 5000);

//     return () => clearInterval(interval); 
// }, [dispatch]);


=======
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
  return (
    <Routes>
      {/* Public Routes */}
      {routes.publicRoutes.map((route) => (
<<<<<<< HEAD
        <Route
          key={route.title}
          path={route.path}
          element={<route.component />}
=======
        <Route 
          key={route.title} 
          path={route.path} 
          element={<route.component />} 
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
        />
      ))}

      {/* Protected Routes */}
      {routes.protectedRoute && routes.protectedRoute.map((route) => (
        <Fragment key={route.title}>
          {route.title === "Home" ? (
<<<<<<< HEAD
            <Route
              index
              path={route.path}
              element={<route.component />}
            />
          ) : (
            <Route
              path={route.path}
              element={<route.component />}
=======
            <Route 
              index 
              path={route.path} 
              element={<route.component />} 
            />
          ) : (
            <Route 
              path={route.path} 
              element={<route.component />} 
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
            />
          )}
        </Fragment>
      ))}
    </Routes>
  );
}

export default App;