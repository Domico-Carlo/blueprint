import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext/AuthProvider';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';

const Register = () => {
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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

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
      {userLoggedIn && <Navigate to={'/home'} replace={true} />}
      <main className="The-Rest-Plaza">
        <div className="HorrorReg">
          <h2 className="RegText">Sign Up</h2>
          <h2 className="EnterYourDetails">Please enter your details</h2>
        </div>
        <form onSubmit={onSubmit} className="SignUpForm">
          <div>
            <label className="FirstNameForm">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="Please enter your first name"
              required
            />
          </div>
          <div>
            <label className="LastNameForm">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Please enter your last name"
              required
            />
          </div>
          <div>
            <label className="EmailForm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Please enter your email"
              required
            />
          </div>
          <div>
            <label className="PasswordForm">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Please enter your password"
              required
            />
          </div>
          <div>
            <label className="ConfirmPasswordForm">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Please confirm your password"
              required
            />
          </div>
          <div>
            <label className="AddressForm">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Please enter your address"
              required
            />
          </div>
          <div>
            <label className="CityForm">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleCityChange}
              placeholder="Please enter your city"
              required
            />
          </div>
          <div>
            <label className="StateForm">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={handleStateChange}
              placeholder="Please enter your state"
              required
            />
          </div>
          <div>
            <label className="PostalCodeForm">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={handlePostalCodeChange}
              placeholder="Please enter your postal code"
              required
            />
          </div>
          <div>
            <label className="DateOfBirthForm">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              required
            />
          </div>
          {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
          <button type="submit" disabled={isRegistering}>
            {isRegistering ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </main>
    </>
  );
};

export default Register;