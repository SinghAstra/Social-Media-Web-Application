import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Welcome from "./components/Welcome";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import Friends from "./components/Friends";
import Settings from "./components/Settings";

function App() {
  return (
    <div className="bg-black text-white font-mono">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/app/welcome" />} />
        <Route path="app" element={<Home />}>
          <Route path="/app/welcome" element={<Welcome />} />
          <Route path="/app/add-post" element={<AddPost />} />
          <Route path="/app/profile" element={<Profile />} />
          <Route path="/app/friends" element={<Friends />} />
          <Route path="/app/settings" element={<Settings />} />
        </Route>
        <Route path="/auth/log-in" element={<LogIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
