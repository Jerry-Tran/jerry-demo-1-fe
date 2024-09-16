import { instance as axiosClient } from "@/config";
type userData = {
  name?: string;
  email: string;
  password: string;
};
export const apiRegister = async (userData: userData) => {
  const response = await axiosClient.post("/auth/register", userData);
  return response;
};
export const apiLogin = async (userData: userData) => {
  const response = await axiosClient.post("/auth/login", userData);
  return response;
};

