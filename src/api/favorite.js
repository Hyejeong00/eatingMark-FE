import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const getAllFavoritePlaces = async () => {
    try{
        const res = await axios.get(`${baseUrl}/users/places`) // 찜한 맛집 목록 조회
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

export const addFavoritePlace = async (place) => {
    try{
        const res = await axios.post(`${baseUrl}/users/places`,{place}) // 찜한 맛집 추가
        const data = res.data
        console.log(data.message)
    }catch(err){
        console.log(err)
    }

}

export const removeFavoritePlace = async (placeId) => {
    try{
        const res = await axios.delete(`${baseUrl}/users/places/${placeId}`) // 찜한 맛집 삭제
        const data = res.data
        console.log(data)
        console.log(data.message)
    }catch(err){
        console.log(err)
    }

}