export const getAllTasks = async (token) => {
  const data = JSON.stringify({});
  return await fetch(`https://task-app-node-js-887b.onrender.com/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      return responseData;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const createTasksAPI = async (
  title,
  description,
  status,
  id,
  isUpdate
) => {
  const data = JSON.stringify({
    title: title,
    description: description,
    status: status,
  });

  const url = isUpdate
    ? `https://task-app-node-js-887b.onrender.com/tasks/${id}`
    : `https://task-app-node-js-887b.onrender.com/tasks`;

  const method = isUpdate ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error; // Re-throw error to handle it in the caller
  }
};

export const deleteTasksAPI = async (id) => {
  if (!id) {
    throw new Error("Task ID is required for deletion.");
  }

  const url = `https://task-app-node-js-887b.onrender.com/tasks/${id}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Task deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in deleteTasksAPI:", error);
    throw error; // Re-throw for the caller to handle
  }
};

