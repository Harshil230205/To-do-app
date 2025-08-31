import React from "react";
import { getErrorMessage } from "../../utils/ErrorMessage";
import toast from "react-hot-toast";
import { TodoServices } from "../../services/TodoSrvices";

const PopModel = ({
  showModel,
  setShowModel,
  title,
  setTitle,
  discription,
  setDiscription,
  getUserTask
}) => {
  if (!showModel) return null;

  const closePopModel = () => setShowModel(false);

  const clearPopModel = () => {
    setTitle("");
    setDiscription("");
    setShowModel(false);
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const createdBy = userData?.userWithoutPassword._id;

      const data = { title, discription, createdBy };
      if (!title || !discription) {
        toast.error("Please fill all fields");
      }
      const res = await TodoServices.createController(data);
      getUserTask()
      toast.success(res.data.message);
      setTitle("");
      setDiscription("");
      setShowModel(false);
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err));
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50   z-50 ">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold dark:text-gray-100">
            Add New Task
          </h5>
          <button
            onClick={closePopModel}
            className="text-xl font-bold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            X
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
        <div className="flex justify-end gap-2">
          <button
            onClick={clearPopModel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopModel;
