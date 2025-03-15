import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext/AuthProvider';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import ReactSearchBox from "react-search-box";
import { FaHome, FaCalendarAlt } from 'react-icons/fa';
import { LuListTodo } from "react-icons/lu";
import SearchBar from 'react-js-search';

const Landing = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();

  const sidebarLinks = {

  }

  const onSearchChange = (term, hits) => {

  }
  
  const onSearchButtonClick = () => {

  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      setErrorMessage('');

      try {
        await doCreateUserWithEmailAndPassword(
          email,
          password,
          firstName,
          lastName,
          address,
          city,
          state,
          postalCode,
          dateOfBirth
        );
        navigate('/home'); // Redirect to home page after successful registration
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
        <div>
          <Sidebar>
            <Menu>
                <MenuItem icon={<FaHome />}> Landing </MenuItem>
                <MenuItem icon={<FaCalendarAlt />}> Calendar </MenuItem>
                <MenuItem icon={<LuListTodo />}> To-Do </MenuItem>
            </Menu>
        </Sidebar>
        <SearchBar
          onSearchTextChange={onSearchChange()}
          onSearchButtonClick={onSearchButtonClick()}
          data={
            [ 
              {number: 12, name:"Buffon", position: "ST", success: true},
              {number: 21, name: "Pirlo", position: "MC", success: false}
            ]
          }
        />
        </div>
        
        {/* <ReactSearchBox
          placeholder="Placeholder"
          value="Doe"
          data={[
            {
              key: "john",
              value: "John Doe"
            },
            {
              key: "jane",
              value: "Jane Doe"
            },
            {
              key: "karius",
              value: "Karius"
            }
          ]}
          callback={(record) => console.log(record)}
          onSelect={(record) => console.log(record)}
          onFocus={() => {
            console.log("This function is called when is focussed");
          }}
          onChange={(value) => console.log(value)}
          autoFocus
          leftIcon={<>🎨</>}
          iconBoxSize="48px"
        /> */}
    </>
  );
};

export default Landing;