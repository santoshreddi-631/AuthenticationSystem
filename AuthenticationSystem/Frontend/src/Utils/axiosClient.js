import axios from "axios";
const axiosCLient = axios.create({
    baseURL:'https://authenticationsystem-fnxv.onrender.com/'
})
export default axiosCLient;