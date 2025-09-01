import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL
export const getAllPlaces = async () => {
    try{
        const res = await axios.get(`${baseUrl}/places`)
        const data = res.data
        return data.places
    }catch(err){
        console.log(err)
        if (err.response?.status === 404) {
            throw new Error("요청하신 데이터를 찾을 수 없습니다. (404)");
        } else {
            throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
    }
}