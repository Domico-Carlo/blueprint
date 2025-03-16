import Login from "./components/auth/login/login";
import Register from "./components/auth/register/regist";
//import { AuthProvider } from "./contexts/authContext/AuthProvider";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Notes from "./components/Functions/notes";
import React, { useState, useRef } from 'react';
import { Button, HStack, Dialog, Field, Input, Portal, Stack, Textarea, VStack,Text, Flex, Badge,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,
  ModalCloseButton, Divider } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import TodoList from "./components/todolist/TodoList.tsx"

import './App.css'
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
    }
  ];
  
  return useRoutes(routesArray);
}

function App() {

  const [visible, setVisible] = useState('true')

  const ref = useRef<HTMLInputElement>(null);

  const todosList = [
    { id: 1, text: 'Buy eggs'},
    { id: 2, text: 'Walk the dog'},
    { id:3, text: 'Watch a movie'}
  ];

  const [todos, setTodos] = useState(todosList);

  function deleteTodo(id){
    const newTodos = todos.filter((item)=> {
      return item.id !== id 
    })
    setTodos(newTodos)
    console.log(newTodos)
    }
    
    function addTodo(newTodo){
    setTodos([...todos,newTodo])
    }
    
    function editTodo(id,updatedTodo){
    const updatedItem = todos.map((todo) => {
        return todo.id === id ? updatedTodo : todo;
      });
    setTodos(updatedItem)
    }

  return (
    <>
        <Sidebar />
        <div class="container">
            
            <div class="header">
                <div class="header-left">
                    <img src="placeholder_logo.png" alt="Blueprint Logo" />
                    <nav>
                        <a href="#">Notes</a>
                        <a href="#">Calendar</a>
                        <a href="#">To-do</a>
                    </nav>
                </div>
                <div class="header-right">
                    <input type="text" placeholder="Search" />
                    <button>Q</button>
                </div>
            </div>
            <div class="content">
                <div class="left-panel">
                    <div class="clock-container">
                      </div>
                    <div class="clock-time">4:00 PM</div>
                </div>
                <div class="middle-panel">
                    <div class="calendar">
                    </div>
                </div>
                <div class="right-panel">
                    <ul>
                      <li>FIT1051 - Introduction to Free WAMAssignment 1: Due Mar 6(Not Submitted)</li>
                      <li>FIT2004 - The Horror The Horror The Horror The HorrorAssignment 1: Due Apr 12(Not Submitted)</li>
                      <li>FIT3158 - The Horror Electric BoogalooAssignment 1: Due Apr 15(Submitted)</li>
                      <li>-</li>
                      <li>-</li>
                    </ul>
                </div>
            </div>
            <div class="for-you">
                <div class="for-you-header">
                    <h2>FOR YOU</h2>
                    <div>
                      <HStack>
                        <Dialog.Root initialFocusEl={() => ref.current}>
                          <Dialog.Trigger asChild>
                            <Button variant="outline"><FaPlus /> Add widget</Button>
                          </Dialog.Trigger>
                          <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                              <Dialog.Content>
                                <Dialog.Header>
                                  <Dialog.Title>Dialog Header</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body pb="4">
                                  <Stack gap="4">
                                    <Field.Root>
                                      <Field.Label>Title</Field.Label>
                                      <Input placeholder="Title" />
                                    </Field.Root>
                                    <Field.Root>
                                      <Field.Label>Description</Field.Label>
                                      <Textarea autoresize />
                                    </Field.Root>
                                  </Stack>
                                </Dialog.Body>
                                <Dialog.Footer>
                                  <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </Dialog.ActionTrigger>
                                  <Button>Save</Button>
                                </Dialog.Footer>
                              </Dialog.Content>
                            </Dialog.Positioner>
                          </Portal>
                        </Dialog.Root>
                      </HStack>
                      <button>Edit Layout</button>
                      <button>...</button>
                    </div>
                </div>
                <div class="for-you-content">
                    <div class="notes-widget">
                        Notes
                    </div>
                </div>
            </div>
        </div>
      <div>
        <div>
          {/* <HStack>
            <Dialog.Root initialFocusEl={() => ref.current}>
              <Dialog.Trigger asChild>
                <Button variant="outline"><FaPlus /> Add widget</Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Dialog Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body pb="4">
                      <Stack gap="4">
                        <Field.Root>
                          <Field.Label>Title</Field.Label>
                          <Input placeholder="Title" />
                        </Field.Root>
                        <Field.Root>
                          <Field.Label>Description</Field.Label>
                          <Textarea autoresize />
                        </Field.Root>
                      </Stack>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Button>Save</Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </HStack> */}
        </div>
      </div>
      
      
      
      {/* <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); } }>
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog> */}
    </>
  );
}

export default App;
