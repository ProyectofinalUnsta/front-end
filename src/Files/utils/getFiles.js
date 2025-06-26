import axios from "axios"
import endpoints from "../../utils/endpoints"
export const getFiles = async (email) => {
     const mail = email
    const response  = await axios.get(`${endpoints.files}/${mail}`)
    return response
}