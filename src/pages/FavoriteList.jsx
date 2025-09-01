import { useEffect } from "react";
import useFavoriteStore from "../store/FavoriteStore";
import PlaceCard from "../components/PlaceCard";

export default function FavoriteList() {
    const { favorites, isLoading, error } = useFavoriteStore()


    if(isLoading) return <p>찜 목록을 불러오는 중...</p>
    if(error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col items-center gap-3">
            <h1>찜한 맛집</h1>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            { favorites.map((place) =>  <PlaceCard key={place.id} place={place}/>) }
            </div>
        </div>
    )
}