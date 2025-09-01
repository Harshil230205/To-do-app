import axios from "axios";

const API_URL = "https://to-do-app-nv7j.onrender.com/api/v1";

// Always set the Authorization header before each request
axios.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

const createController = (data) => {
  return axios.post(`${API_URL}/todo/create`, data);
};
const getAllTodo = (id) => {

  return axios.post(`${API_URL}/todo/getAll/${id}`);
};
const updateTodo = (id,data) => {
  return axios.patch(`${API_URL}/todo/update/${id}`, data);
};
const deleteTodo = (id) => {
  return axios.delete(`${API_URL}/todo/delete/${id}`);
};

export const TodoServices = {
  createController,
  getAllTodo,
  updateTodo,
  deleteTodo,
};
