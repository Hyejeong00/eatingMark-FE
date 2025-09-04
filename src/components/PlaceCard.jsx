import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function MarkCard({ place }) {
  const { title, image } = place;
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white"
      onClick={() => navigate(`/detail/${place.id}`)}
    >
      <img
        src={`${baseUrl}/${image.src}`}
        alt={image.alt}
        className="w-full h-48 object-cover"
      />
      <div className="flex justify-between items-center p-3">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <FavoriteButton place={place} />
      </div>
    </div>
  );
}
