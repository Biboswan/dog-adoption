import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  withCredentials: true,
});
//process.env.NEXT_PUBLIC_API_URL