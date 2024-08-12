import React, { useState } from 'react';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '', // New state for re-entered password
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Clear previous error message
    setErrorMessage('');

    // Sending the registration request to the server
    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then((data) => {
        // Handle success, e.g., redirect to login page or show success message
        console.log('Registration successful:', data);
      })
      .catch((error) => {
        // Handle errors
        setErrorMessage('Registration failed. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row w-100">
        <div className="col-xs-12 col-md-6 col-lg-4 mx-auto">
          <h2 className="text-center mb-4">Register</h2>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="confirmPassword">Re-enter Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={credentials.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4 w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
