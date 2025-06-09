import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { CgMail } from "react-icons/cg";
import { FaUnlockAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" }); 

  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); 

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage({ text: "Login successful", type: "success" });

        setTimeout(() => {
          navigate("/year"); 
        }, 3000);
      } else {
        setMessage({ text: "Invalid email or password.", type: "error" });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage({ text: error.response?.data?.message || "Server error. Please try again later.", type: "error" });
    }
  };

  return (
    <section>
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          
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
              autoComplete="new-password"
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
            <label>Password</label>
          </div>

          
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>

         
          <button type="submit">Login</button>

         
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
