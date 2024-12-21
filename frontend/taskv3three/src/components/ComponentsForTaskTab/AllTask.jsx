import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlusCircle } from "react-icons/fi";
import { deleteTasksAPI, getAllTasks } from "../../apis/TasksApi";
import CreateTasks from "./CreateTasks";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllTask = () => {
  const [allTaskData, setAllTaskData] = useState([]);
  const [openCreateTasks, setOpenCreateTasks] = useState(false);
  const [selectedEditTasks, setSelectedEditTasks] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTasksLoading, setIsTasksLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllTasksFromApi = async () => {
    setIsTasksLoading(true);
    try {
      const responseData = await getAllTasks();
      if (responseData) {
        setAllTaskData(responseData);
      }
    } catch (error) {
      toast.error("Failed to fetch tasks.");
    } finally {
      setIsTasksLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    const response = await deleteTasksAPI(id);
    if (response) {
      toast.success("Tasks Deleted Succefully");
      getAllTasksFromApi();
    }
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
      dispatch(clearUser());
      toast.success("Logout Successfully");
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getAllTasksFromApi();
  }, [openCreateTasks]);

  return (
    <div className="w-full bg-gray-100 min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Task Manager</h1>
        <button
          onClick={logout}
          className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Logout"
          )}
        </button>
      </div>

      {/* Main Content */}
      {openCreateTasks ? (
        <CreateTasks
          openCreateTasks={openCreateTasks}
          setOpenCreateTasks={setOpenCreateTasks}
          selectedEditTasks={selectedEditTasks}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      ) : (
        <div className="w-full max-w-6xl">
          <div className="flex flex-row items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Task List</h2>
            <button
              onClick={() => setOpenCreateTasks(true)}
              className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
            >
              <FiPlusCircle className="mr-2" /> Create
            </button>
          </div>

          {isTasksLoading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-10 w-10 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : allTaskData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTaskData.map((task) => (
                <div
                  key={task._id}
                  className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-indigo-500 hover:shadow-xl transition-shadow relative"
                >
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {task.title}
                  </h3>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedEditTasks(task);
                        setOpenCreateTasks(true);
                        setIsUpdate(true);
                      }}
                      className="flex items-center justify-center bg-indigo-400 text-white p-2 rounded-lg hover:bg-indigo-500 transition"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="flex items-center justify-center bg-red-400 text-white p-2 rounded-lg hover:bg-red-500 transition"
                    >
                      <FiTrash />
                    </button>
                  </div>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.status === "pending"
                          ? "bg-red-100 text-red-600"
                          : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {task.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(task.createdAt).toLocaleDateString()}{" "}
                      {new Date(task.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center mt-16">
              <svg
                className="h-16 w-16 text-gray-400 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-lg text-gray-600">
                No tasks available. Start by creating a new task!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllTask;
