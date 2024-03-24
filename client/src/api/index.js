import axios from "axios";
const API_URL = "http://localhost:5000/api/";

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const logInApi = (values) => API.post(`/user/log-in`, values);

export const signUpApi = (values) => API.post(`/user/sign-up`, values);
