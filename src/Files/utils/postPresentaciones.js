import axios from "axios"
import endpoints from "../../utils/endpoints"
export const postPresentaciones = async (formDataToSend) => {
  const response = await axios.post(`${endpoints.presentaciones}presentations`,formDataToSend , {
    headers:  { 'Content-Type': 'multipart/form-data' }
  })
  return response
}