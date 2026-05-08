import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-sevp.onrender.com/api",
});

export default api;
