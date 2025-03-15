import Login from "./components/auth/login/login";
import Register from "./components/auth/register/regist";
import { AuthProvider } from "./contexts/authContext/AuthProvider";
import { BrowserRouter, useRoutes } from "react-router-dom";
import React from 'react';
import { Image } from 'react-native';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

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
      path: "/dashboard",
      element: <Sidebar>
                <Menu>
                  <MenuItem icon={<Image source='./logo.svg'/>}> Landing </MenuItem>
                  <MenuItem> Calendar </MenuItem>
                  <MenuItem> To-Do </MenuItem>
                </Menu>
              </Sidebar>
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
