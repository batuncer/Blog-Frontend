import User from "./UserTypes";

export interface Post {
  id: number;
  userId: number |undefined;
  title: string;
  text: string;
  postLikes:number[];
  user?:User | undefined;

}

export default Post;
