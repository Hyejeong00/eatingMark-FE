import { useParams } from "react-router-dom"
import usePlaceStore from "../store/PlaceStore"
import NaverMap from "../components/NaverMap"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function PlaceDetail() {
    const { id } = useParams()
    const { getPlaceById } = usePlaceStore()
    const place = getPlaceById(id)

    if (!place) return <p className="text-center mt-10 text-gray-500">맛집 정보를 불러오는 중입니다...</p>

    return (
        <div className="flex max-w-6xl mx-auto p-6 gap-6">
            {/* 왼쪽: 맛집 정보 */}
            <div className="w-1/2 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md border">
                <img
                    src={`${BASE_URL}/${place.image.src}`}
                    alt={place.image.alt}
                    className="w-full h-64 object-cover rounded-lg"
                />
                <h2 className="text-2xl font-bold text-gray-800">{place.title}</h2>
                <p className="text-gray-600">{place.description}</p>
            </div>

            {/* 오른쪽: 네이버 지도 */}
            <div className="w-1/2">
                <div className="h-full rounded-xl overflow-hidden shadow-md border">
                    <NaverMap lat={place.lat} lon={place.lon} title={place.title} />
                </div>
            </div>
        </div>
    )
}
