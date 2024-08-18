import axios from 'axios';
import { IStudent } from '../types/student';
import { API_URL } from '../constants/constUrls';

export const createStudent = async (studentData: IStudent) => {
    try {
        const response = await axios.post(API_URL.STUDENTS, studentData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create student`);
    }
};
