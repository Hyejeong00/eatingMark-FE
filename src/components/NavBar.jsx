import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="flex justify-center ">
            <button><Link to="/">맛집 목록</Link></button>
            <button><Link to="/favorite">찜 목록</Link></button>
        </div>
    )
}