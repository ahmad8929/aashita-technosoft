import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

// routes
import routes from "./routes";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      {routes.publicRoutes.map((route) => (
        <Route 
          key={route.title} 
          path={route.path} 
          element={<route.component />} 
        />
      ))}

      {/* Protected Routes */}
      {routes.protectedRoute && routes.protectedRoute.map((route) => (
        <Fragment key={route.title}>
          {route.title === "Home" ? (
            <Route 
              index 
              path={route.path} 
              element={<route.component />} 
            />
          ) : (
            <Route 
              path={route.path} 
              element={<route.component />} 
            />
          )}
        </Fragment>
      ))}
    </Routes>
  );
}

export default App;