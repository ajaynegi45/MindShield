import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8082/api/journals";

// Helper function to get userId from cookies
const getUserId = () => {
  const userCookie = Cookies.get("user");
  return userCookie ? JSON.parse(userCookie).userId : null;
};

// Fetch all journals
export const getJournals = async () => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Please log in.");
  }

  try {
    const response = await axios.get(API_URL, {
      headers: { userId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching journals:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new journal
export const createJournal = async (title, content) => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Cannot create journal.");
  }

  try {
    const response = await axios.post(
      API_URL,
      { title, content },
      {
        headers: { userId },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating journal:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a journal
export const deleteJournal = async (id) => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Cannot delete journal.");
  }

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { userId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting journal:", error.response?.data || error.message);
    throw error;
  }
};

// Update a journal
export const updateJournal = async (id, title, content) => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not authenticated. Cannot update journal.");
  }

  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { title, content },
      {
        headers: { userId },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating journal:", error.response?.data || error.message);
    throw error;
  }
};
