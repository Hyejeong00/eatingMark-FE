export default function MarkCard ({place}) {
    const {title, image} = place
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    return (
        <div className="flex flex-col max-w-50 mx-auto cursor-pointer p-2 border ">
            <img src={`${baseUrl}/${image.src}`} alt={image.alt}/>
            <p>{title}</p>
        </div>
    )
}