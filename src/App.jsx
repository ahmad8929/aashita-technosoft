// lib
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

// routes
import routes from "./routes";

function App() {
  return (
    <Routes>
      {routes.publicRoutes.map((route) => (
        <Route key={route.title} path={route.path} element={<route.component />} />
      ))}

      {routes.protectedRoute && routes.protectedRoute.map((route) => (
        <Fragment>
        {
          route.title === "Home" ? <Route index key={route.title} path={route.path} element={<route.component />} /> : 
            <Route key={route.title} path={route.path} element={<route.component />} />
        }
      </Fragment>
      ))}
    </Routes>
  );
}

export default App;

