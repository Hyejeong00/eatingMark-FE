import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

export default function NavBar() {

    const handleClickSearch = () => {

    }

    return (
        <div className="flex items-center justify-around gap-4 py-4 bg-white shadow-md sticky top-0 z-10">
            <Link
                to="/"
                className="text-3xl font-bold text-gray-800"
            >
                <h1 className="text-3xl font-bold text-gray-800">🍽️ 헝그리</h1>
            </Link>

            {/* 검색 기능 */}
            <div className="relative w-55">
                <input
                    className="w-full h-8 pl-4 pr-8 border rounded-full focus:outline-none"
                    placeholder="오늘은 뭐 먹지?"
                />
                <IoIosSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={handleClickSearch} />
            </div>


            <Link
                to="/favorite"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
            >
                찜 목록
            </Link>
        </div>
    );
}
