import { apiRegister, apiLogin } from "@/apis";
type userData = {
  name: string;
  email: string;
  password: string;
};
export const registerService = async (userData: userData) => {
  const response = await apiRegister(userData);
  return response;
};
export const loginService = async (userData: userData) => {
  const response = await apiLogin(userData);
  return response;
};
