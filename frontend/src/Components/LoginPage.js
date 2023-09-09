import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.status === 200 && responseData.message === 'Login successful') {
        console.log('Login successful');
        alert('Login Successful');
        setLoginStatus('success');
        setFormData({ ...initialFormData, password: '' });

        // Navigate to 'BrowsePets'
        navigate('/browse'); // Use the correct route path
      } else if (response.status === 404) {
        console.log('User not found');
        setLoginStatus('userNotFound');
        // You can display an error message to the user.
      } else if (response.status === 401 && responseData.message === 'Invalid password') {
        console.log('Invalid password');
        setLoginStatus('invalidPassword');
        // You can display an error message to the user.
      } else {
        console.log('Error logging in');
        setLoginStatus('error');
        // You can display an error message to the user.
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle other errors as needed.
      setLoginStatus('error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {loginStatus === 'success' && (
          <div className="login-success">
            <i className="fas fa-check-circle"></i>
          </div>
        )}
        {loginStatus === 'userNotFound' && (
          <div className="login-error">
            <i className="fas fa-times-circle"></i>
            <p>User not found. <a href="/register">Sign up</a> to get logged in.</p>
          </div>
        )}
        {loginStatus === 'invalidPassword' && (
          <div className="login-error">
            <i className="fas fa-times-circle"></i>
            <p>Invalid Password. Please try again.</p>
          </div>
        )}
        {loginStatus === 'error' && (
          <div className="login-error">
            <i className="fas fa-exclamation-circle"></i>
            <p>Error logging in. Please try again later.</p>
          </div>
        )}
        <p className="signup-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
