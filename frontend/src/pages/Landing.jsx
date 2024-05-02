import "../styles/landing.css";
import { Grid, Card, Typography, Button, TextField, Box } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const backendUrl = import.meta.env.VITE_API_URL;

function Landing() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.post(`${backendUrl}/signup`, {
        username,
        password,
      });
      navigate("/signin");
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: "4rem" }}>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card className="landing-card left-card">
            <Typography variant="h4">
              Keep all your tasks in one place, some more text and some image
            </Typography>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ00x3ArV4bxw5X_FRkub4laQrc4AcHnrqPD-ThBQ5piGd0XeX5xEn6i-RbaXu9NeXKeqY"></img>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card
            className="landing-card right-card"
            style={{ border: "1px solid black", boxShadow: "non" }}
          >
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={username}
              size="lg"
              fullWidth={true}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
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
            <Button
              variant="contained"
              fullWidth={true}
              style={{ height: "54px" }}
              onClick={handleClick}
            >
              SIGN UP
            </Button>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "30px auto 0",
                width: "220px",
              }}
            >
              <Typography variant="subtitle1">Already A User</Typography>
              <Button
                variant="contained"
                style={{ bottom: "4px" }}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                SIGN IN
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Landing;
