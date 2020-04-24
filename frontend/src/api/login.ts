import LoginData from "../types/login";
import axios from "axios";

export const login = (loginData: LoginData) =>
  axios.post("/api/user/login", loginData).then(response => response.data);

export const logout = () => axios.post("/api/user/logout");

export const getCurrentUser = () =>
  axios.get("/api/user").then(response => response.data);
