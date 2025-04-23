import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { config } from "../config";

const Register = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [value, setValue] = useState([]);
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const {name, email, password} = value
      if(!name || !email || !password){
        setError("Name, Email and Password are required")
        return
      }
      if(password.length < 6){
        setError("Password must have 6 characters");
        return
      }
      if (password !== confirmPassword) {
        setPasswordError(true);
        return;
      }
      const response = await axios.post(`${config.API.baseURL}/user/register`, {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("id", response.data._id);
        navigate("/home");
      }
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  const handleFieldChange = (fieldName, fieldValue) =>{
    setValue((prev) => ({...prev, [fieldName]: fieldValue.target.value}))
  }

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
                value={value.name}
                onChange={(value) => handleFieldChange("name", value)}
                placeholder="Name"
              />
              <input
                required
                type="email"
                className="textField"
                placeholder="Email"
                value={value.email}
                onChange={(value) => handleFieldChange("email", value)}
              />
              <input
                required
                type="password"
                className="textField"
                placeholder="Password(6 characters minimun)"
                pattern=".{0}|.{6,}" 
                value={value.password}
                onChange={(value) => handleFieldChange("password", value)}
              />
              <input
                required
                type="password"
                className="textField"
                placeholder="Confirm Password"
                value={confirmPassword}
                pattern=".{0}|.{6,}" 
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="textField btn"
                type="submit"
                onClick={(e) => addUser(e)}
              >
                Sign in
              </button>
              {error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : passwordError ? (
                <p style={{ color: "red" }}>Password is not matching</p>
              ) : (
                ""
              )}
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
