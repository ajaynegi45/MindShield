import axios from "axios";

const API_URL = "http://localhost:8082/api/journals";

// Fetch all journals
export const getJournals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new journal
export const createJournal = async (content) => {
  const response = await axios.post(API_URL, { content });
  return response.data;
};

export const deleteJournal = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateJournal = async (id, content) => {
  const response = await axios.put(`${API_URL}/${id}`, { content });
  return response.data;
};
