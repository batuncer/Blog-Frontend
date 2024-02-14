import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { Post } from "../../types/PostTypes";
import { Grid } from "@mui/material";
import PostService from "../../services/postService";

interface CreatePostFormProps {
  onSubmit: (newPost: Post) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [postLikes, setPostLikes] = useState<number[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newPost: Post = {
      id: 0, // it will update after submit
      userId: 1,
      title,
      text,
      postLikes,
    };

    const createdPost = await PostService.createPost(newPost);
    if (createdPost) {
      onSubmit(createdPost);
      setTitle("");
      setText("");
      setPostLikes([]);
    } else {
      // HATA
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatePostForm;
