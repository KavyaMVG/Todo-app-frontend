import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { config } from "../config";

const Login = () => {
  const[value, setValue] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setError(false);
    
    try {
      const {email, password} = value
     if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
      setError(""); 
      const response = await axios.post(`${config.API.baseURL}/user/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("id", response.data._id);
        navigate("/home");
      }
    } catch (err) {
       if (err.response && err.response.data && err.response.data.msg) {
      setError(err.response.data.msg);
    } else {
      setError("Something went wrong. Please try again.");
    }
    }
  };

  const handleFieldChange = (fieldName, fieldValue) => {    
setValue((prev) => ({...prev, [fieldName]: fieldValue.target.value}))  
}
  return (
    <div className="App">
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
            <h1 style={{ textAlign: "center" }}>Login</h1>

            <form className="userInfo">
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
                value={value.password}
                minLength="6"
                onChange={(value) => handleFieldChange("password", value)}
              />
              <button
                onClick={(e) => loginUser(e)}
                className="textField btn"
                type="submit"
              >
                Sign in
              </button>
              {error ? <p style={{ color: "red" }}>{error}</p> : ""}
            </form>
            <Link to="/" className="link">
              Don't have an account? <Button>Register</Button>
            </Link>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
