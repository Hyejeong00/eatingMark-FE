import { useEffect } from "react"
import usePlaceStore from "../store/PlaceStore"
import PlaceCard from './PlaceCard';

export default function PlacesList() {
    const { places, fetchPlaces } = usePlaceStore();

    useEffect(() => {
        fetchPlaces()
    }, [])

    return (
        <div className="flex flex-col items-center gap-3">
            <h1>맛집 목록</h1>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> 
                {
                    places.map((place) => <PlaceCard key={place.id} place={place}/>)
                }
            </div>
        </div>
    )
}