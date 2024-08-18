import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/constUrls';
import { useFormContext } from '../context/FormContext';

const useListStudent = () => {
    const { listStudent, setStudent } = useFormContext();

    const fetchStudents = async () => {
        try {
            const response = await axios.get(API_URL.STUDENTS);
            setStudent(response.data);
        } catch (error) {
            console.error('שגיאה בטעינת רשימת התלמידים:', error);
        }
    };

    useEffect(() => {
        if (!listStudent) {
            fetchStudents();
        }
    }, [listStudent, fetchStudents]);

    return listStudent;
};

export default useListStudent;