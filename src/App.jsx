import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlacesList from "./pages/PlacesList";
import Layout from "./components/Layout";
import FavoriteList from "./pages/FavoriteList";
import PlaceDetail from "./pages/PlaceDetail";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        index:true,
        element:<PlacesList />
      },
      {
        path:"/favorite",
        element:<FavoriteList/>
      },
      {
        path:"/detail/:id",
        element:<PlaceDetail/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
