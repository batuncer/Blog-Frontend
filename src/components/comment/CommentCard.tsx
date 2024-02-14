// CommentCard.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
} from "@mui/material";
import axios from "axios";

interface CommentCardProps {
  text: string;
  user_name: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ text, user_name }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/users?username=${user_name}`);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error for username`, error);
        setIsLoading(false);
      }
    };

    if (user_name) {
      fetchUserData();
    }
  }, [user_name]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <Card sx={{ width: "80%", backgroundColor: "#B1BDB9" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#5A6C73" }} aria-label="user">
              {user_name ? user_name.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={user ? user.username : ""}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentCard;
