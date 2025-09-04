import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import useFavoriteStore from "../store/FavoriteStore";
import { useEffect } from "react";
import usePlaceStore from "../store/PlaceStore";

function Layout() {
  const {fetchFavorites} = useFavoriteStore()

    useEffect(() => {
        fetchFavorites()
    }, [])

  return (
    <>
      <div className="flex flex-col gap-3">
        <NavBar />


        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
