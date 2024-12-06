import axios from 'axios';

const API_URL = 'http://127.0.0.1:8081/enquiry'; // Replace with your actual API URL

// Fetch all exams
export const fetchExams = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8081/enquiry');
    return response.data;
  } catch (error) {
    console.error('Error fetching exams:', error.response ? error.response.data : error.message);
    throw error;
  }
};

//Add or update an exam
export const addOrUpdateExam = async (exam, examId = null) => {
  try {
    if (examId) {
      const response = await axios.put(`${API_URL}/${examId}`, exam);
      return response.data;
    } else {
      const response = await axios.post(`${API_URL}`, exam);
      return response.data;
    }
  } catch (error) {
    console.error('Error adding/updating exam:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete an exam
export const deleteExam = async (examId) => {
  try {
    const response = await axios.delete(`${API_URL}/${examId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting exam:', error.response ? error.response.data : error.message);
    throw error;
  }
};