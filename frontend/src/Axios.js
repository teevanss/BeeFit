// Create a baseURL specifying the URL where our backend will exist
import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080",
});