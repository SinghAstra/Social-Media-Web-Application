import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Notification from "./components/Notification/Notification";
import { hideNotification } from "./actions/notifications";

function App() {
  const user = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.notification
  );
  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <ThemeProvider theme={theme}>
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
      <Notification
        open={open}
        onClose={handleCloseNotification}
        message={message}
        severity={severity}
      />
    </ThemeProvider>
  );
}

export default App;
