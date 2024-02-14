import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8082', 
  timeout: 20000, 
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export const setSessionRefreshToken = ( refreshToken: string | null, userId: number) => {
  if ( refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId.toString());
  
  } else {
    localStorage.removeItem("refreshToken");
    delete instance.defaults.headers.common["Authorization"];
      localStorage.removeItem("userId");
    delete instance.defaults.headers.common["Authorization"];
  }

};

export const setSessionAccessToken = (accessToken: string | null) => {
  if ( accessToken) {
    localStorage.setItem("accessToken", accessToken);
    instance.defaults.headers.common["Authorization"] = `${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete instance.defaults.headers.common["Authorization"];
  }

}

export default instance;