import React from 'react';
import BtnNavigate from '../btnNavigate/BtnNavigate';
import './list.css';
import { ROUTES } from '../../constants/constUrls';
import useListStudent from '../../hooks/useListStudent';
import useCities from '../../hooks/useCities';

interface Student {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    israeliID: string;
    cityID: number;
}

interface City {
    cityID: number;
    cityName: string;
}

const List: React.FC = () => {
    const listStudent: Student[] | undefined = useListStudent();
    const cities: City[] | undefined = useCities();

    const getCityName = (cityID: number): string => {
        const city = cities?.find(city => city.cityID === cityID);
        return city ? city.cityName : 'לא ידוע';
    };

    return (
        <div className="list-container">
            <BtnNavigate url={ROUTES.HOME} text="חזרה לעמוד הראשי" />
            <h2>רשימת משתמשים רשומים</h2>
            {listStudent && listStudent.length > 0 ? (
                <ul className="student-list">
                    {listStudent.map((student, index) => (
                        <li key={index} className="student-item">
                            <div>שם מלא: {student.firstName} {student.lastName}</div>
                            <div>תאריך יום הולדת: {student.dateOfBirth}</div>
                            <div>תעודת זהות: {student.israeliID}</div>
                            <div>עיר: {getCityName(student.cityID)}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>אין נתונים להציג</p>
            )}
        </div>
    );
};

export default List;
