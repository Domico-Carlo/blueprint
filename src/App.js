import Login from "./components/auth/login/login";
import Register from "./components/auth/register/regist";
import { AuthProvider } from "./contexts/authContext/AuthProvider";
import { useRoutes } from "react-router-dom";

function App() {
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
let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
    </AuthProvider>
  );
}

export default App
