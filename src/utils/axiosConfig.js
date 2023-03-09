import axios from "axios";

const api = process.env.REACT_APP_API_KEY;
export const customAxios = axios.create({
  headers: {
    "x-api-key": api,
  },
});
