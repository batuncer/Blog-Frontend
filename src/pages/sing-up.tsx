import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  setSessionAccessToken,
  setSessionRefreshToken,
} from "../services/axios";
import { UserService } from "../services/userService";

interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userExists = await UserService.getByUserName(userName);

      if (!userExists) {
        const newUser = {
          userName,
          password,
          accessToken: "",
          refreshToken: "",
        };

        const signUpResponse = await UserService.createUser(
          newUser.userName,
          newUser.password
        );
        if (signUpResponse !== null) {
          setSessionRefreshToken(
            signUpResponse.refreshToken,
            signUpResponse.userId
          );
          const getAccessToken = await UserService.refreshToken(
            signUpResponse.refreshToken,
            signUpResponse.userId
          );

          if (getAccessToken !== null) {
            setSessionAccessToken(getAccessToken.accessToken);
            navigate("/home");
          }
        } else {
          setError("Invalid username or password.");
        }
      }
    } catch (error) {
      setError("An error occurred while signing up");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form onSubmit={handleSubmit} style={{ gap: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom align="center">
                Sign Up
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {error && (
                <Typography
                  variant="body1"
                  style={{ color: "red" }}
                  align="center"
                >
                  {error}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
