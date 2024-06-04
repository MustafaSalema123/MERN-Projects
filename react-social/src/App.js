//import Home from "./pages/home/Home";
//import PersonIcon from '@mui/icons-material/Person';

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
// import {
//   BrowserRouter as Router,
//   Route
// } from "react-router-dom";

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Navigate 
} from "react-router-dom";
//Dinsr tuse Rediect intrad use navigate
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import VedioContainer from "./pages/VedioContainer/VedioContainer";

function App() {

  const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ?<Home /> : <Register/>} />
      </Routes>
      <Routes>
      <Route path="/messenger" element={<Messenger/>} />
      </Routes>
      <Routes>
      <Route path="/reels" element={<VedioContainer/>} />
      </Routes>
      
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
      </Routes>
      <Routes>
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
     
    //     <Route exact  path="/">

    //     <Home />
    //     </Route>
    //     <Route path="/login">

    //     <Login />
    //     </Route>
    //     <Route path="/register">

    //     <Register />
    //     </Route>
    //     <Route path="/profile/:username">

    //     <Profile />
    //     </Route>
     

      
    // </BrowserRouter>

    
  );
}

export default App;
