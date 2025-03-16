import Login from "./components/auth/login/login";
import Register from "./components/auth/register/regist";
import { AuthProvider } from "./contexts/authContext/AuthProvider";
import { BrowserRouter, useRoutes } from "react-router-dom";
// import Notes from "./components/Functions/notes";
import Calendar from "./components/Functions/calendar/calendar";
// import TodoList from "./components/Functions/TodoList/TodoList";
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
    },
    {
      path: "/notes",
      element: <Notes/>
    },
    {
      path: "/calendar",
      element: <Calendar />
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
