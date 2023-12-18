import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/auth" element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;
