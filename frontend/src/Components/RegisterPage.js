import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/RegisterPage.css";
// import Home from "./Home";
import BrowsePets from "./BrowsePets";

const RegisterPage = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate(); // Create a navigate function for navigation

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
      const response = await fetch("https://petpal-6n5y.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // User registered successfully
        console.log("User registered successfully");
        // Reset the form fields
        setFormData(initialFormData);
        // Show an alert message
        window.alert("Registration Successful!");
        // Navigate to the home page
        setRegistrationSuccess(true);
        navigate("/browse"); // Redirect to the home page
        // You can navigate to a success page or perform any other action here.
      } else if (response.status === 400) {
        // Email already exists
        console.log("Email already exists");
        // You can display an error message to the user.
      } else {
        // Handle other scenarios or show an error message
        console.error("Error in registration:", response.statusText);
        alert("Error in registration. Please try again."); // Show an error alert
      }
    } catch (error) {
      console.error("Error in registration:", error);
      alert("Error in registration. Please try again."); // Show an error alert
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Sign Up</h2>
        {registrationSuccess ? (
          <BrowsePets /> // Render Home component after successful registration
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
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
            <button type="submit">Sign Up</button>
          </form>
        )}
        {registrationSuccess && (
          <p className="registration-success">Registration Successful!</p>
        )}
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
