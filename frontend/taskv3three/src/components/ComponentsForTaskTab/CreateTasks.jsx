import React, { useState, useEffect } from "react";
import { createTasksAPI } from "../../apis/TasksApi";
import { toast } from "react-toastify";

const CreateTasks = ({
  selectedEditTasks,
  openCreateTasks,
  setOpenCreateTasks,
  isUpdate,
  setIsUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  console.log("selectedEditTasks", selectedEditTasks);
  useEffect(() => {
    if (isUpdate && selectedEditTasks) {
      setTitle(selectedEditTasks.title || "");
      setDescription(selectedEditTasks.description || "");
      setStatus(selectedEditTasks.status || "pending");
    }
  }, [isUpdate, selectedEditTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createTasksAPI(
        title,
        description,
        status,
        isUpdate ? selectedEditTasks._id : null,
        isUpdate
      );

      if (response) {
        toast.success(
          isUpdate ? "Task updated successfully!" : "Task created successfully!"
        );
        setOpenCreateTasks(false);
        setIsUpdate(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="relative h-screen w-full flex items-start justify-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/flat-design-minimalist-background_23-2149987685.jpg?ga=GA1.1.735048578.1734624286&semt=ais_hybrid')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="bg-white w-[500px] shadow-lg rounded-2xl p-8 max-w-lg relative z-10 mt-2">
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/online-document-form-digital-agreement-electronic-contract-internet-questionnaire-list-note-voting-ballot-poll-flat-design-element_335657-2667.jpg?semt=ais_hybrid"
            alt="Task Illustration"
            className="w-16 h-16 object-contain"
          />
        </div>

        <h2 className="text-2xl font-extrabold text-indigo-600 my-2 text-center">
          {isUpdate ? "Update Task" : "Create a New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Task Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="description"
            >
              Task Description
            </label>
            <textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Status Dropdown for Update */}
          {isUpdate && (
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="status"
              >
                Task Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          {/* Submit and Cancel Buttons */}
          <div className="flex sm:flex-row flex-col gap-4 items-center justify-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isUpdate ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenCreateTasks(false);
                setIsUpdate(false);
              }}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
};

export default CreateTasks;
