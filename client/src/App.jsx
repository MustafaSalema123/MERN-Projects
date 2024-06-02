import Navbar from "./components/navbar/Navbar";
//import "./layouts.scss";
import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Regiter from "./routes/register/register";
import Login from "./routes/login/login";



import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePostLoader } from "./lib/loaders";
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
          element: <ListPage/>,
          loader: listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage/>,
          loader: singlePostLoader,
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
    },
    {
      path: "/",
      element : <RequireAuth/>,
      children: [
        {         
            path: "/profile",
            element: <ProfilePage />,  
            loader: profilePageLoader        
        }, {
          path: "/profile/update",
          element: <ProfileUpdatePage/>
        },
        {
          path: "/add",
          element: <NewPostPage/>
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
