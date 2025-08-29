import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {

  return (
    <>
      <div className="flex flex-col gap-3">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
