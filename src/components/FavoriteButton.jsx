import { useState } from "react";
import useFavoriteStore from "../store/FavoriteStore";
import Modal from "./Modal";

export default function FavoriteButton({ place }) {
    const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
    const isFavorite = favorites?.some((fav) => fav.id === place.id);

    const [showMoadal, setShowModal] = useState(false) // 모달 상태

    const handleClickFavorite = (e) => {
        e.stopPropagation();
        if(isFavorite){
            setShowModal(true)  // 삭제 전에 모달 띄움
        }else{
            addFavorite(place) // 찜 추가
        }
    }

    const onConfirm = () => {
        removeFavorite(place.id)
        setShowModal(false)
    }

    const onCancel = () => {
        setShowModal(false)
    }


    return (
        <>
            <button className={isFavorite ? "text-red-500 cursor-pointer" : "cursor-pointer"}
                onClick={handleClickFavorite}>
                {isFavorite ? '♥' : '♡'}
            </button>

            {showMoadal && (
                <Modal message={`정말 삭제하시겠습니까?`} onConfirm={onConfirm} onCancel={onCancel}/>
            )}
        </>
    );
}
