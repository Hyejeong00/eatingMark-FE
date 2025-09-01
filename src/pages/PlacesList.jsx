import { useEffect, useState } from "react";
import usePlaceStore from "../store/PlaceStore";
import PlaceCard from "../components/PlaceCard";
import { sortPlacesByDistance } from "../js/loc";

export default function PlacesList() {
  const { places, isLoading, error, fetchPlaces } = usePlaceStore(); // zustand
  const [sortedPlaces, setSortedPlaces] = useState([]); // 정렬된 맛집
  const [positionObj, setPositionObj] = useState(null); // 위치 상태
  const [selectedOption, setSelectedOption] = useState(""); // 옵션 상태

    // 위치 가져오기
    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const positionObj = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            resolve(positionObj);
            },
            (err) => {
            reject("위치를 불러오지 못했습니다.");
            }
        );
        });
    };

    // 맛집 리스트 불러오기
    useEffect(() => {
    const fetchData = async () => {
        await fetchPlaces();  
    };

    fetchData();
    }, []);

    // 위치 정보 불러오기
    useEffect(() => {
    const getLocation = async () => {
        try {
            const loc = await getUserLocation();
            setPositionObj(loc);
        } catch (err) {
            console.warn(err); // 위치 거부해도 렌더링은 계속됨
        }
    };

    getLocation();
    }, []);

  // places가 바뀌면 sortedPlaces도 초기화, 이렇게 안하면 처음 렏더링될 때 fetch가 비동기라 렌더링이 안됨
  useEffect(() => {
    if (places.length > 0) {
      setSortedPlaces(places);
    }
  }, [places]);

  // 정렬 처리
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

    return (
        <div className="flex flex-col items-center gap-3">
        <h1>맛집 목록</h1>

        <label htmlFor="sort-select">정렬 방법</label>
        <select
            name="sort"
            id="sort-select"
            value={selectedOption}
            onChange={handleChangeSort}
        >
            <option value="" disabled>선택해주세요</option>
            <option value="distance">가까운순</option>
        </select>

        {isLoading && <p>맛집을 불러오는 중입니다...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {sortedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
            ))}
            </div>
        )}
        </div>
    );
}
