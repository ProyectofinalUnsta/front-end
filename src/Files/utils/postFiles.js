import axios from "axios"
import endpoints from "../../utils/endpoints"
export const postFiles = async (formDataToSend) => {
  const response = await axios.post(`${endpoints.files}/upload`,formDataToSend , {
    headers:  { 'Content-Type': 'multipart/form-data' }
  })
  return response
}