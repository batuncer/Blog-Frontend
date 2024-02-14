import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Profile from "./pages/profile";
import Home from "./pages/home";
import SearchAppBar from "./components/Header";
import Footer from "./components/Fotter";
import SignUpForm from "./pages/sing-up";
import LoginForm from "./pages/login";
import { CircularProgress, Stack } from "@mui/material";
import {
  setSessionAccessToken,
  setSessionRefreshToken,
} from "./services/axios";
import { UserService } from "./services/userService";

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken && userId) {
      setSessionRefreshToken(refreshToken, +userId);

      const getRefresh = async () => {
        const getAccessToken = await UserService.refreshToken(
          refreshToken,
          +userId
        );

        if (getAccessToken !== null) {
          setSessionAccessToken(getAccessToken.accessToken);
          setIsAppLoading(false);
        } else {
          window.location.href = "/";
        }
      };

      getRefresh();
    } else {
      setIsAppLoading(false);
    }
  }, []);

  const handleSignUpSuccess = () => {
    window.location.href = "/home";
  };

  return (
    <div className="App">
      {isAppLoading ? (
        <Stack
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Stack>
      ) : (
        <Router>
          <SearchAppBar />
          <Routes>
            <Route
              path="/singup"
              element={<SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
            />
            <Route
              path="/"
              element={<LoginForm onLoginSuccess={handleSignUpSuccess} />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/users/:userId" element={<Profile />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
