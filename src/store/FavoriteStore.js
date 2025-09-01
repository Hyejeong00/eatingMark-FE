import { create } from 'zustand';
import { addFavoritePlace, getAllFavoritePlaces, removeFavoritePlace } from '../api/favorite';

const useFavoriteStore = create((set) => ({
    favorites: [],
    isLoading: false,
    error:null,
    // 찜 목록 불러오기
    fetchFavorites: async () => {
        set({ isLoading:true, error:null })
        try {
            const data = await getAllFavoritePlaces();
            set({ favorites: data, isLoading:false });
        } catch (err) {
            set({ error: err.message, isLoading: false });
            console.error("찜 목록 불러오기 실패:", err);
            throw err
        }
    },
    // 찜 추가
    addFavorite: async (place) => {
        try{
            await addFavoritePlace(place)
            set((state) => ({
                favorites: [...state.favorites, place]
            }))
        }catch(err){
            console.error("찜 추가 실패:", err);
            throw err
        }
    },
    // 찜 삭제
    removeFavorite: async (placeId) => {
        try{
            await removeFavoritePlace(placeId)
            set((state) => ({
                favorites: state.favorites.filter((fav) => fav.id !== placeId)
            }))
        }catch(err){
            console.error("찜 삭제 실패:", err);
            throw err
        }
    }
}));

export default useFavoriteStore;
