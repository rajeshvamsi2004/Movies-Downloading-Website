import React, { useState } from "react";
import axios from "axios";
import { CgMail } from "react-icons/cg";
import { FaUnlockAlt } from "react-icons/fa";
import "./Login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };
  return (
    <section>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>

      
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
            <label>Username</label>
          </div>

          <div className="input-box">
            <span className="icon3">
              <CgMail size={15} />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <label>Email</label>
          </div>

          
          <div className="input-box">
            <span className="icon2">
              <FaUnlockAlt size={15} />
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <label>Create Password</label>
          </div>

          
          <div className="input-box">
            <span className="icon2">
              <FaUnlockAlt size={15} />
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <label>Confirm Password</label>
          </div>

          <button type="submit">Signup</button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
