import axios, { setSessionAccessToken, setSessionRefreshToken } from "./axios";
import { User } from "../types/UserTypes";
import RefreshToken from "../types/RefreshToken";
import LoginResult from "../types/LoginResult";
import SingUpResult from "../types/SingUpResult";
import { AxiosError } from "axios";

class UserService {
  static async getAllUsers(): Promise<User[]> {
    const response = await axios.get("/users");
    return response.data;
  }

  static async getUserById(userId: number): Promise<User | null> {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  static async getByUserName(userName: string): Promise<User | null> {
    try {
      const response = await axios.get(`/users/${userName}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  static async createUser(userName :String ,password: String ): Promise<SingUpResult | null> {
    try {
      const response = await axios.post("auth/register", {userName, password});
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }

  static async authenticateUser(userName: string, password: string): Promise<LoginResult | null> {
    try {
      const response = await axios.post("/auth/login", { userName, password });
      return response.data;
    } catch (error) {
      console.error("Error authenticating user:", error);
      return null;
    }
  }

  static async refreshToken(refreshToken: string, userId: number): Promise<RefreshToken | null> {
    try {
      const response = await axios.post("/auth/refresh", { refreshToken, userId });
      console.log(response.status);

      return response.data;

  } catch (error) {


          const er = error as AxiosError;
          if(er.response?.status === 401){
        setSessionAccessToken(null);
        setSessionRefreshToken(null,0)

     

        return null;
      }
      // Handle 400
 
      console.error("Error refreshing token:", error);
      return null;
    }
  }
}

export { UserService };