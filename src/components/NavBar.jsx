import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <nav className="flex justify-center gap-4 py-4 bg-white shadow-md sticky top-0 z-10">
        <Link
            to="/"
            className="px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
        >
            맛집 목록
        </Link>
        <Link
            to="/favorite"
            className="px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
        >
            찜 목록
        </Link>
        </nav>
    );
}
