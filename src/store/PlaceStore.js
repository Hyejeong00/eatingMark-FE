import { create } from 'zustand';
import { getAllPlaces } from '../api/places';

const usePlaceStore = create((set) => ({
  places: [],
  fetchPlaces: async () => {
    try {
      const data = await getAllPlaces();
      set({ places: data });
    } catch (err) {
      console.error("데이터 불러오기 실패", err);
    }
  },
}));

export default usePlaceStore;
