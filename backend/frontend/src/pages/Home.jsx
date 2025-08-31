import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import PopModel from "../components/layout/PopModel";
import { useEffect } from "react";
import { TodoServices } from "../services/TodoSrvices";
import Card from "../components/layout/Card";
import Spinner from "../components/layout/Spinner";

const Home = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [allTask, setAllTask] = useState([]);

  // Check if user is logged in
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const id = userData && userData?.userWithoutPassword._id;
  console.log("User ID:", id);
  if (!id) {
    // Redirect to login or show an error if not logged in
    window.location.href = "/login"; // Adjust the path as needed
  }
  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);  
      setLoading(false); 
      console.log("User Tasks:", data);
      setAllTask(data?.todos);

      {
        allTask;
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getUserTask();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            x
            placeholder="Search your task"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => setShowModel(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Task
          </button>
        </div>
      </div>
      <div className="">
        {loading  ? <Spinner /> : allTask && (
          <Card
            allTask={allTask}
            setTitle={setTitle}
            setDiscription={setDiscription}
            getUserTask={getUserTask}
          />
        )}
      </div>

      <PopModel
        showModel={showModel}
        setShowModel={setShowModel}
        title={title}
        setTitle={setTitle}
        discription={discription}
        setDiscription={setDiscription}
        getUserTask={getUserTask}
      />
    </>
  );
};

export default Home;
