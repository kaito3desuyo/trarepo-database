import axios from "axios"
import oidc from "./oidc-client"
const token = oidc.token()
axios.defaults.headers.common["Authorization"] = token
axios.defaults.baseURL = "http://localhost:9000/api/v1"
export default axios
