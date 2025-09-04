import { useEffect, useState } from "react";
import usePlaceStore from "../store/PlaceStore";
import PlaceCard from "../components/PlaceCard";
import { sortPlacesByDistance } from "../js/loc";

export default function PlacesList() {
    const { places, isLoading, error, fetchPlaces } = usePlaceStore();
    const [sortedPlaces, setSortedPlaces] = useState([]);
    const [positionObj, setPositionObj] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([])

    const categories = [
    "All","한식", "일식", "중식", "양식", "분식",
    "카페", "디저트", "술집", "패스트푸드"
    ];

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            resolve({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
            },
            () => {
            reject("위치를 불러오지 못했습니다.");
            }
        );
        });
    };

    useEffect(() => {
        const fetchData = async () => {
        await fetchPlaces();
        };
        fetchData();
    }, []);

    useEffect(() => {
        const getLocation = async () => {
        try {
            const loc = await getUserLocation();
            setPositionObj(loc);
        } catch (err) {
            console.warn(err);
        }
        };
        getLocation();
    }, []);

    useEffect(() => {
        if (places.length > 0) {
        setSortedPlaces(places);
        }
    }, [places]);

    const handleChangeSort = (e) => {
        const value = e.target.value;
        setSelectedOption(value);

    if (value === "distance" && positionObj) {
        const sortedList = sortPlacesByDistance(places, positionObj.lat, positionObj.lon);
            setSortedPlaces(sortedList);
        } else {
            setSortedPlaces(places);
        }
    };

    const handleCategoryToggle = (cate) => {
        const newSelected = selectedCategories.includes(cate)
            ? selectedCategories.filter((c) => c !== cate)
            : [cate]; // 하나만 선택되게

        setSelectedCategories(newSelected);

        if (newSelected.length === 0 || cate === "All") {
            setSortedPlaces(places);
        } else {
            const filtered = places.filter((place) =>
            newSelected.includes(place.category)
            );
            setSortedPlaces(filtered);
        }
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
            
            {/* 카테고리, 필터링 기능 / 하나만 선택 가능하게 그리고 클릭되ㅣ면 색쌀변하게*/}
            <div className="flex gap-3">
                {categories.map((cate, idx) => <p key={idx} className="px-4 py-2 border cursor-pointer hover:bg-blue-200" onClick={() => handleCategoryToggle(cate)}>{cate}</p>)}
            </div>

            {/* 정렬 셀렉트 */}
            <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-gray-600">
                정렬:
            </label>
            <select
                id="sort-select"
                value={selectedOption}
                onChange={handleChangeSort}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
                <option value="" disabled>
                선택해주세요
                </option>
                <option value="distance">가까운 순</option>
            </select>
            </div>
        </div>

        {/* 로딩/에러 */}
        {isLoading && (
            <p className="text-center text-gray-500 mt-10">맛집을 불러오는 중입니다...</p>
        )}
        {error && (
            <p className="text-center text-red-500 mt-10">{error}</p>
        )}

        {console.log(selectedCategories, ":", sortedPlaces)}

        {/* 맛집 카드 리스트 */}
        {!isLoading && !error && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sortedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
            ))}
            </div>
        )}
        </div>
    );
}
