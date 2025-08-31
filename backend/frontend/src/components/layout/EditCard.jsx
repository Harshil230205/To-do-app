import React, { useState, useEffect } from "react";
import { getErrorMessage } from "../../utils/ErrorMessage";
import toast from "react-hot-toast";
import { TodoServices } from "../../services/TodoSrvices";
// import TodoServices and toast as needed

const EditCard = ({
  setShowModel,
  title: initialTitle,
  discription: initialDiscription,
  isCompleted: initialIsCompleted,
  taskId, // pass this from parent for update
  onUpdate, // callback to refresh tasks after update
  getUserTask
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [discription, setDiscription] = useState(initialDiscription || "");
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted || false);

  // Update local state when modal opens with new task
  useEffect(() => {
    setTitle(initialTitle || "");
    setDiscription(initialDiscription || "");
    setIsCompleted(initialIsCompleted || false);
  }, [initialTitle, initialDiscription, initialIsCompleted]);

  const handleUpdate = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const updatedData = {
        title,
        discription,
        isCompleted,
        createdBy: userData?.userWithoutPassword._id,
      };

      if (!title || !discription) {
        toast.error("Please fill all fields");
        return;
      }

      // Make sure to send the task id for update
      const res = await TodoServices.updateTodo(taskId, updatedData);
      getUserTask();
      toast.success(res.data.message);
      setShowModel(false);
      if (onUpdate) onUpdate(); // refresh tasks if needed
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold dark:text-gray-100">
            Update Task
          </h5>
          <button
            onClick={() => setShowModel(false)}
            className="text-xl font-bold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            ×
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your task"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="discription"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="Enter your description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200">Task Status</label>
          <select
            value={isCompleted ? "completed" : "pending"}
            onChange={(e) => setIsCompleted(e.target.value === "completed")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="pending">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            onClick={() => setShowModel(false)}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
