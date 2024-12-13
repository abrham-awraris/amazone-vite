import axios from "axios";

const axiosInstance = axios.create({
     // baseURL :'http://localhost:5001'
     baseURL: "https://amazon-api-deployement-f4aq.onrender.com"
});

export { axiosInstance };
