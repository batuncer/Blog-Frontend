import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import CreatePostForm from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import postService from "../services/postService";
import { Post } from "../types/PostTypes";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [topLikedPosts, setTopLikedPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const postsData = await postService.getAllPosts();
      setPosts(postsData || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Error fetching posts. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Recalculate top liked posts whenever posts change
    const getTopLikedPosts = (count: number) => {
      if (posts.length === 0) return [];

      // Sort posts by number of likes
      const sortedPosts = [...posts].sort(
        (a, b) => b.postLikes.length - a.postLikes.length
      );

      // Take the top liked posts
      return sortedPosts.slice(0, count);
    };

    setTopLikedPosts(getTopLikedPosts(3));
  }, [posts]);

  const createPost = (newPost: Post) => {
    fetchPosts();
  };

  return (
    <Grid container spacing={5} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Box
          mt={2}
          sx={{
            backgroundColor: "#5A6C73",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {" "}
          <CreatePostForm onSubmit={createPost} />
        </Box>

        {posts.map((post) => (
          <Box
            key={post.id}
            mt={2}
            boxShadow={3}
            sx={{
              backgroundColor: "#B1BDB9",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <PostCard post={post} />
          </Box>
        ))}
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          mt={2}
          sx={{
            backgroundColor: "#B1BDB9",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", color: "white" }}>
            Most Liked Posts
          </Typography>
          {topLikedPosts.map((post) => (
            <Box key={post.id} mt={2} boxShadow={3}>
              <PostCard
                post={post} // Post objesini tek bir prop olarak geçiriyoruz
              />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
