import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:44313"
});

export default api;