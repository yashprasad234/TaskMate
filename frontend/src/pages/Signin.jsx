import React from "react";
import { Card, TextField, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const backendUrl = "http://localhost:3000/api";

/**
 * Functional component representing the sign-in form.
 * @returns {JSX.Element} JSX representation of the component.
 */
function Signin() {
  const navigate = useNavigate();

  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle sign-in button click
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/login`,
        null,
        {
          headers: { username, password },
        }
      );
      // Redirect to tasks page on successful sign-in
      navigate("/tasks");
      console.log(response.data);
      // Store the token in local storage
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ margin: "50px auto 20px", maxWidth: "400px" }}>
      <Card display={{ border: "none", boxShadow: "none", overflow: "none" }}>
        {/* Username input */}
        <TextField
          label="Email"
          type="email"
          value={username}
          size="lg"
          fullWidth={true}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        {/* Password input */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          size="lg"
          fullWidth={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        {/* Sign-in button */}
        <Button
          variant="contained"
          fullWidth={true}
          style={{ height: "54px" }}
          onClick={handleClick}
        >
          SIGN IN
        </Button>
        <br />
        <br />
        {/* Sign-up button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "30px auto 0",
            width: "220px",
          }}
        >
          <Typography variant="subtitle1">New here?</Typography>
          <Button
            variant="contained"
            style={{ bottom: "4px" }}
            onClick={() => {
              navigate("/");
            }}
          >
            SIGN UP
          </Button>
        </div>
      </Card>
    </Box>
  );
}

export default Signin;
