import axios from "axios"
import endpoints from "../../utils/endpoints"
export const deletePresentaciones = async (id) => {
 await axios.delete(`${endpoints.presentaciones}${id}`)
}