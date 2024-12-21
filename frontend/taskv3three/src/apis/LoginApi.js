// API Function
export const registerWithAPi = async (name, email, password) => {
  const data = JSON.stringify({ name, email, password });
  try {
    const response = await fetch(
      `https://task-app-node-js-887b.onrender.com/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
// API Function
export const loginWithApi = async (email, password) => {
  const data = JSON.stringify({ email, password });
  try {
    const response = await fetch(
      `https://task-app-node-js-887b.onrender.com/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
