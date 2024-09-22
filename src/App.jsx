// lib
import { Routes, Route } from "react-router-dom";

// home component
import HomePage from "./pages/Home";

// routes
import routes from "./routes";

function App() {
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

