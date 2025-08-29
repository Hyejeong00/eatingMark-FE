import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL
export const getAllPlaces = async () => {
    const res = await axios.get(`${baseUrl}/places`)
    const data = res.data
    return data.places
}