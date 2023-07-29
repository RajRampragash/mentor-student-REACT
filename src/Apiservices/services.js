import axios from 'axios';

const BASE_URL = 'https://assign-mentor-1ikw.onrender.com/app';

export const getAllStudents = async () => {
    const response = await axios.get(`${BASE_URL}/students/all`);
    return response;
};

export const viewStudent = async (id) => {
    const response = await axios.get(`${BASE_URL}/students/find/${id}`);
    return response;
};
export const getAllmentor = async () => {
    const response = await axios.get(`${BASE_URL}/mentor/all`);
    return response;
};

export const viewMentor = async (id) => {
    const response = await axios.get(`${BASE_URL}/mentors/find/${id}`);
    return response;
};

export const addStudent = async (payload) => {
    const response = await axios.post(`${BASE_URL}/students/add`, payload);
    return response;

};

export const addMentor = async (payload) => {
    const response = await axios.post(`${BASE_URL}/mentors/add`, payload);
    return response;
};

export const getUnassignedStudents = async () => {
    const response = await axios.get(`${BASE_URL}/students/all/unassigned`);
    return response;
};

export const updateStudent = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/students/edit/${id}`, payload);
    return response;
};

export const updateMentor = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/mentors/edit/${id}`, payload);
    return response;
};

export const removeMentee = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/mentors/edit-mentee/${id}`, payload);
    return response;
};

export const updateStudentMany = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/students/edit/many/${id}`, payload);
    return response;
};