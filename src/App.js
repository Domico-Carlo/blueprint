import Login from "./components/auth/login/login";
import Register from "./components/auth/register/regist";
import { AuthProvider } from "./contexts/authContext/AuthProvider";
import { BrowserRouter, useRoutes } from "react-router-dom";

function AppRoutes() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }
  ];
  
  return useRoutes(routesArray);
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
