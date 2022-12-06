import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return;
      }
      console.log(name);
      const response = await axios.post("http://localhost:3001/user/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("id", response.data._id);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div>
      <CssBaseline />

      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#fff",
            minHeight: "100vh",
            margin: "1rem",
            padding: "2rem",
            borderRadius: "5px",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <form className="userInfo">
              <input
                type="text"
                className="textField"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
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
              <input
                required
                type="password"
                className="textField"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="textField btn"
                type="submit"
                onClick={(e) => addUser(e)}
              >
                Sign in
              </button>
              {error ? <p style={{ color: "red" }}>User already exists</p> : ""}
            </form>
            <Link to="/login" className="link">
              Already have an account?<Button>Login</Button>
            </Link>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
