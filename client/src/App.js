import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.authState);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Navigate to="/posts" />} />
        <Route exact path="/posts" element={<Home />} />
        <Route exact path="/posts/search" element={<Home />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route
          exact
          path="/auth"
          element={user ? <Navigate to="/posts" /> : <Auth />}
        />
      </Routes>
    </div>
  );
}

export default App;
