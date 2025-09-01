import FavoriteButton from "./FavoriteButton"

export default function MarkCard ({place}) {
    const {title, image} = place
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    return (
        <div className="flex flex-col max-w-50 mx-auto cursor-pointer p-2 border ">
            <img src={`${baseUrl}/${image.src}`} alt={image.alt}/>
            <div className="flex justify-between">
                <p>{title}</p>
                <FavoriteButton place={place}/>
            </div>
        </div>
    )
}