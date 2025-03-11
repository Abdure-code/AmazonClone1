import axios from "axios";

//baseURL: "http://localhost:5000"
const axiosInstance = axios.create({ baseURL:"https://amazon-api-deploy-ag6c.onrender.com/" });


export {axiosInstance}