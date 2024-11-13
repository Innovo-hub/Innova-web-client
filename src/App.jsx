import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/Register";

function App() {
  return (
    <>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        {/* Auth Routes */}
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
