import axios from "axios";
import { configDotenv } from "dotenv";

const api = (() => {
  //configDotenv();
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  });
})();

export default api;
