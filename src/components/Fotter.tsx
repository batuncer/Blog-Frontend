import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const FooterContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  marginTop: "auto",
  padding: "10px",
  backgroundColor: "#CC6C5C",
  color: "white",
});

const FooterIconContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const FooterText = styled(Typography)({
  fontWeight: "bold",
});

const Footer = () => {
  return (
    <FooterContainer style={{ marginTop: "30px" }}>
      <FooterText>BMT BLOG</FooterText>
      <FooterIconContainer>
        <Button
          component={Link}
          to="//github.com"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          style={{ marginRight: "10px", color: "white" }}
        >
          GitHub
        </Button>
        <Button
          component={Link}
          to="//linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<LinkedInIcon />}
          style={{ color: "white" }}
        >
          LinkedIn
        </Button>
      </FooterIconContainer>
    </FooterContainer>
  );
};

export default Footer;
