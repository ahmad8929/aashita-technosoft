// lib
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import { setAuthState } from "./redux/slices/index";

// home component
import HomePage from "./pages/Home";

// routes
import routes from "./routes";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      navigate("/signup");
    } 

    dispatch(setAuthState(true));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route index element={<HomePage />} />

      {routes.publicRoutes.map((route) => (
        <Route key={route.title} path={route.path} element={<route.component />} />
      ))}

      {routes.protectedRoute && routes.protectedRoute.map((route) => (
        <Route key={route.title} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
}

export default App;

