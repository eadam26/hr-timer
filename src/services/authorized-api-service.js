
import axios from "axios"

const baseURL = process.env.VUE_APP_API_BASE
const token = process.env.VUE_APP_API_TOKEN

if (!baseURL || !token) {
    console.error("The environment API data is missing.");
}
const authorizedApiService = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: "Bearer " + token
    }
})

export default authorizedApiService