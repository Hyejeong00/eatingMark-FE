import { create } from 'zustand';
import { getAllPlaces } from '../api/places';

const usePlaceStore = create((set, get) => ({
  places: [],
  isLoading: false,
  error:null,
  fetchPlaces: async () => {
    set({ isLoading:true, error:null })
    try {
      const data = await getAllPlaces();
      set({ places: data, isLoading:false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      console.error("데이터 불러오기 실패", err);
      throw err
    }
  },
  getPlaceById: (placeId) => get().places.find((place) => place.id === placeId)
}));

export default usePlaceStore;
