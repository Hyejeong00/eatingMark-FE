import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favorite from "./components/Favorite";
import PlacesList from "./components/PlacesList";
import Layout from "./components/Layout";

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
        element:<Favorite/>
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
