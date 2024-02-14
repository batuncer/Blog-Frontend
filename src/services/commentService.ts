import axios from "../services/axios";
import Comment from "../types/CommentTypes"; 

class CommentService {
async getAllComments(postId: number): Promise<Comment[]> {
  try {
    const response = await axios.get<Comment[]>(`/comments?postId=${postId}`); 
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
}



  async createComment(newComment:Comment): Promise<Comment | null> {
    try {
      const response = await axios.post<Comment>("/comments", newComment);
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      return null;
    }
  }



}

export default new CommentService();
