import axios from "axios";
import server from "./server"
const serverDev = 'http://localhost:3000'
const serverProd = 'https://nodeserverpp.herokuapp.com/'

const httpService = axios.create({
  baseURL: `/`,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    // 'Accept': 'application/json',
    // 'Access-Control-Allow-Credentials': 'true'

  },
  // onDownloadProgress: progressEvent => pointerEvents(progressEvent),
  // onUploadProgress: progressEvent => pointerEvents(progressEvent),
});

export default httpService;
