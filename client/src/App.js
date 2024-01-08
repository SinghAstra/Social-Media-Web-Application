import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  const user = useSelector((state) => state.auth.authState);

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
    </ThemeProvider>
  );
}

export default App;
