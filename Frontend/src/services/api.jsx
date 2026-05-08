import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-production-0cf8.up.railway.app/api",
});

export default api;
