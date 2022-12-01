import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("id", response.data.id);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="App">
      <CssBaseline />

      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#f2f2f2",
            minHeight: "100vh",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}>Login</h1>

            <form className="userInfo">
              <input
                required
                type="email"
                className="textField"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                required
                type="password"
                className="textField"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(e) => loginUser(e)}
                className="textField btn"
                type="submit"
              >
                Sign in
              </button>
              {error ? <p style={{ color: "red" }}>Error logging in...</p> : ""}
            </form>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Login;