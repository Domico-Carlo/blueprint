// import React, { useState } from 'react';
// import { Navigate, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../contexts/authContext/AuthProvider';
// import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


// const Sidebar = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [postalCode, setPostalCode] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [confirmPassword, setConfirmedPassword] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const { userLoggedIn } = useAuth();

//   const sidebarLinks = {

//   }

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     if (!isRegistering) {
//       setIsRegistering(true);
//       setErrorMessage('');

//       try {
//         await doCreateUserWithEmailAndPassword(
//           email,
//           password,
//           firstName,
//           lastName,
//           address,
//           city,
//           state,
//           postalCode,
//           dateOfBirth
//         );
//         navigate('/home'); // Redirect to home page after successful registration
//       } catch (error) {
//         setErrorMessage(error.message);
//       } finally {
//         setIsRegistering(false);
//       }
//     }
//   };

//   return (
//     <>
//         <Sidebar>
//             <Menu>
//                 <SubMenu label="Charts">
//                     <MenuItem> Pie charts </MenuItem>
//                     <MenuItem> Line charts </MenuItem>
//                 </SubMenu>
//                 <MenuItem> Documentation </MenuItem>
//                 <MenuItem> Calendar </MenuItem>
//             </Menu>
//         </Sidebar>
//     </>
//   );
// };

// export default Sidebar;