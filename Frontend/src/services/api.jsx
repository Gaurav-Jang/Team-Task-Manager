import axios from "axios";

const api = axios.create({
  baseURL: "http://team-task-manager-production-e350.up.railway.app/api",
});

export default api;
