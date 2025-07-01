import axios from "axios"
import endpoints from "../../utils/endpoints"
export const getPresentaciones = async () => {

    const response  = await axios.get(endpoints.presentaciones)
    return response.data
}