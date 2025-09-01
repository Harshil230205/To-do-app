import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NoPage from "./pages/NoPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="dark min-h-screen bg-gray-900 text-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
