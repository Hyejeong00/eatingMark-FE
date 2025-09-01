import useFavoriteStore from "../store/FavoriteStore";
import PlaceCard from "../components/PlaceCard";

export default function FavoriteList() {
  const { favorites, isLoading, error } = useFavoriteStore();

  if (isLoading) return <p className="text-center text-gray-600">찜 목록을 불러오는 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h1 className="text-2xl font-bold text-gray-800">찜한 맛집</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">찜한 맛집이 없습니다.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-screen-xl">
          {favorites.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
