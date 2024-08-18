import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/constUrls';
import { useFormContext } from '../context/FormContext';

const useCities = () => {
    const { listCity, setCity } = useFormContext();

    const fetchCities = async () => {
        try {
            const response = await axios.get(API_URL.CITIES);
            setCity(response.data);
        } catch (error) {
            console.error('שגיאה בטעינת הערים:', error);
        }
    };

    useEffect(() => {
        if (!listCity) {
            fetchCities();
        }
    }, [listCity, fetchCities]);

    return listCity;
};

export default useCities;