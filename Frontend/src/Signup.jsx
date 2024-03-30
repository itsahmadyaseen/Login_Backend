import  { useState } from "react";
import axios from 'axios'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/signup", { email, password });
      alert("Signup successfull");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed");
    }
  };

  return (
    <div>
      
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
