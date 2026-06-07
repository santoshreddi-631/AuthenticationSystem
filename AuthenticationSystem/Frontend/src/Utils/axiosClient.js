import axios from "axios";
const axiosCLient = axios.create({
    baseURL:'http://localhost:3000'
})
export default axiosCLient;