import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="bg-black text-white font-mono">
      <Navbar />
      <Routes>
        <Route path="app" element={<Home />}>
          <Route path="/app/welcome" element={<Welcome />} />
        </Route>
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
      {/* <img
        src={`${process.env.PUBLIC_URL}/assets/images/logIn.svg`}
        alt="logIn"
      /> */}
    </div>
  );
}

export default App;
