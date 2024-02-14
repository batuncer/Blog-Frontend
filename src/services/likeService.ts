import axios from "../services/axios";
import { Like } from "../types/LikeTypes"; 


class LikeService {

   async getAllLikesForPost(postId: string): Promise<Like[]> {
    try {
      const response = await axios.get<Like[]>(`/likes/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching likes for post:", error);
      throw error;
    }
  }

  async deleteLike(likeId: string): Promise<void> {
    try {
      await axios.delete(`/likes/${likeId}`);
    } catch (error) {
      console.error("Error deleting like:", error);
      throw error;
    }
  }
 async createOneLike(postId: string, newLike: Like): Promise<void> {
    try {
      await axios.post(`/posts/${postId}/likes`, newLike);
      console.log("New like created successfully!");
    } catch (error) {
      console.error("Error creating like:", error);
      throw error;
    }
  }
}


export default new LikeService();