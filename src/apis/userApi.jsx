import http from "../services/http";

export const registerUser = async (userData) => {
  return await http.post("/register", userData);
};

export const loginUser = async (userData) => {
  return await http.post("/login", userData);
};

