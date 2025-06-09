import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: "Password reset successfully!", type: "success" });

    setTimeout(() => navigate("/"), 3000);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>
    </section>
  );
};

export default ResetPassword;
