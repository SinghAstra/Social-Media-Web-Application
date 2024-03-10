import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification/Notification";
import { hideNotification } from "./actions/notifications";
import Profile from "./pages/Profile";

function App() {
  const { open, message, severity } = useSelector(
    (state) => state.notification
  );
  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const user = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();

  return (
    <div className="font-mono">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Navigate to="/posts" />} />
        <Route exact path="/posts" element={<Home />} />
        <Route exact path="/posts/search" element={<Home />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route
          exact
          path="/auth"
          element={user ? <Navigate to="/posts" /> : <Auth />}
        />
      </Routes>
      <Notification
        open={open}
        onClose={() => {
          handleCloseNotification();
        }}
        message={message}
        severity={severity}
      />
    </div>
  );
}

export default App;
