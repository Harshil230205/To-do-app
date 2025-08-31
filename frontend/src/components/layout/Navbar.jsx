import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setUsername(userData?.userWithoutPassword?.name);
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    
    <nav className="bg-blue-700 dark:bg-gray-900 px-6 py-3 flex items-center justify-between shadow">
      <Link to="/" className="text-white text-2xl font-bold">
        To-Do App
      </Link>
      {userName ? (
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">{userName}</span>
          <button
            onClick={logoutHandler}
            className=" text-blue-700 px-3 py-1 rounded hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition bg-gray-400 border-2 border-amber-50"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="text-white hover:underline bg-gray-400 border-2 border-amber-50">
            Login
          </Link>
          <Link to="/register" className="text-white hover:underline bg-gray-400 border-2 border-amber-50">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
