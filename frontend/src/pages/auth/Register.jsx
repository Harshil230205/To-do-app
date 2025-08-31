import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthServices from "../../services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { name, email, password };
      const res = await AuthServices.registerUser(data);
      toast.success(res.message);
      navigate("/login");
    } catch (error) {
      console.error(getErrorMessage(error));
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-900">
      <form
        onSubmit={registerHandler}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-4">
          Register
        </h2>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold dark:bg-blue-800 dark:hover:bg-blue-900"
        >
          Submit
        </button>
        <div className="text-center mt-2">
          Already a user?{" "}
          <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
