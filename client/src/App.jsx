import Navbar from "./components/navbar/Navbar";
//import "./layouts.scss";
import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Regiter from "./routes/register/register";
import Login from "./routes/login/login";



import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
        path: "/",
        element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage/>
        },
        {
          path: "/:id",
          element: <SinglePage/>
        },
        {
          path: "/profile",
          element: <ProfilePage />
        },

        {
          path: "/register",
          element: <Regiter />
        },
        {
          path: "/login",
          element: <Login />
        }

      ]
    }
  ]);

  return (
    <>
      {/* <div  className="layout">
    <Navbar/>
    <HomePage/>
    </div> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App;
