import axios from "axios"
import endpoints from "../../utils/endpoints"
export const deleteFiles = async (id) => {
 await axios.delete(`${endpoints.files}/${id}`)
}