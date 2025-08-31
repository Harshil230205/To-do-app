import axios from "axios";

const backendUrl = "https://nextstep-todo-app.netlify.app/api/v1"; // <--- no trailing slash
axios.defaults.baseURL = backendUrl;

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}/user/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.post("/user/logout");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const AuthServices = {
  registerUser,
  loginUser,
  logoutUser,
};

export default AuthServices;
