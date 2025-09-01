import React, { useState } from "react";
import EditCard from "./EditCard.jsx";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage.js";
import { TodoServices } from "../../services/TodoSrvices.js";

const Card = ({ allTask, setTitle, setDiscription,getUserTask }) => {
  const [showModel, setShowModel] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await TodoServices.deleteTodo(id);
      getUserTask()
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage());
    }
  };

  // Return message if no tasks are provided
  if (!allTask || allTask.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-6 text-gray-100 max-w-md">
        <p className="text-gray-400">No tasks available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {allTask.map((task) => (
        <div
          key={task._id}
          className="bg-gray-800 rounded-lg shadow-md p-6 text-gray-100 max-w-md"
        >
          <h3 className="text-xl font-semibold mb-2">
            {task.title || "Untitled Task"}
          </h3>
          <p className="text-gray-300 mb-4">
            {task.discription || "No description"}
          </p>

          <div className="mb-3">
            <span
              className={
                task?.isCompleted
                  ? "text-green-400 font-medium"
                  : "text-yellow-400 font-medium"
              }
            >
              {task?.isCompleted ? "✓ Completed" : "⏳ Pending"}
            </span>
          </div>

          <div className="text-sm text-gray-400 mb-4">
            {/* <p className="mb-1">
              Created by:{" "}
              <span className="font-mono">{task.createdBy || "Unknown"}</span>
            </p> */}
            <p>Date: {task?.createdAt?.substring(0, 10) || "No date"}</p>
          </div>

          <div className="flex gap-3">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => {
                setShowModel(true);
                setEditTask(task);
              }}
            >
              Edit
            </button>

            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {showModel && editTask && (
        <EditCard
          setShowModel={setShowModel}
          taskId={editTask._id}
          title={editTask.title}
          discription={editTask.discription}
          isCompleted={editTask.isCompleted}
          setTitle={setTitle}
          setDiscription={setDiscription}
          getUserTask={getUserTask}
        />
      )}
    </div>
  );
};

export default Card;
