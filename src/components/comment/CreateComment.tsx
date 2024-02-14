import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Comment from "../../types/CommentTypes";
import CommentService from "../../services/commentService";
import axios from "../../services/axios";
import { UserService } from "../../services/userService";

interface CreateCommentFormProps {
  onSubmit: (newComment: Comment) => void;
  postId: number;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  onSubmit,
  postId,
}) => {
  const [text, setText] = useState("");
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [userId]);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId:", storedUserId);
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  const fetchUserDetails = async (userId: number) => {
    try {
      const userDetailsResponse = await UserService.getUserById(userId);
      setUserName(userDetailsResponse?.userName || "");
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      console.error("User Id not found in localStorage");
      return;
    }

    const newComment: Comment = {
      userId: userId,
      userName: userName,
      text: text,
      postId: postId,
    };
    try {
      const createdComment = await CommentService.createComment(newComment);
      if (createdComment) {
        onSubmit(createdComment);
        setText("");
      } else {
        console.error("COMMENT IS NULL");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Grid item xs={12} sm={9}>
          <TextField
            label="Comment"
            value={text}
            onChange={(e) => {
              console.log("New text:", e.target.value);
              setText(e.target.value);
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#CC6C5C",
              "&:hover": {
                backgroundColor: "#4e76d0",
              },
            }}
          >
            Add Comment
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCommentForm;
