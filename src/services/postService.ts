import axios from "../services/axios";
import { Post } from "../types/PostTypes";

class PostService {
  async getAllPosts(): Promise<Post[]> {
    try {
      const response = await axios.get<Post[]>("/posts");
       const posts = response.data;
    return posts.reverse();
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  async getPostById(postId: number): Promise<Post | null> {
    try {
      const response = await axios.get<Post>(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
      return null;
    }
  }

  async createPost(newPost:Post): Promise<Post | null> {
    try {
      const response = await axios.post<Post>("/posts", newPost);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      return null;
    }
  }

  async updatePost(
    postId: number,
    updatedPost: Partial<Post>
  ): Promise<Post | null> {
    try {
      const response = await axios.put<Post>(`/posts/${postId}`, updatedPost);
      return response.data;
    } catch (error) {
      console.error(`Error updating post with ID ${postId}:`, error);
      return null;
    }
  }

  async deletePost(postId: number): Promise<void> {
    try {
      await axios.delete(`/posts/${postId}`);
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
    }
  }
}

export default new PostService();
