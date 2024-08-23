import axios from "axios";

const Interceptor = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

export default Interceptor