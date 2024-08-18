import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';
import './formStudent.css';
import { IStudent } from '../../types/student';
import BtnNavigate from '../btnNavigate/BtnNavigate';
import { ROUTES } from '../../constants/constUrls';
import { validateForm } from '../../utils/validateForm';
import useCities from '../../hooks/useCities';
import { createStudent } from '../../services/studentService';

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    name: string;
    value: string;
    error: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, name, value, error, handleChange }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}:</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
        />
        {error && <span className="error-message">{error}</span>}
    </div>
);

const FormStudent: React.FC = () => {
    const { addStudent } = useFormContext();
    const cities = useCities();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IStudent>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        israeliID: '',
        cityID: 1
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        israeliID: '',
        city: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'israeliID' && !/^\d*$/.test(value)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                israeliID: 'תעודת זהות יכולה להכיל רק מספרים'
            }));
            return;
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { valid, errors } = validateForm(formData);
        setErrors(errors);

        if (valid) {
            const newStudent = await createStudent(formData);
            addStudent(newStudent);
            navigate(ROUTES.USER_LIST);
        }
    };

    return (
        <div className="form-container">
            <h1>טופס הרשמה</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    id="firstName"
                    label="שם פרטי"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    error={errors.firstName}
                    handleChange={handleChange}
                />
                <InputField
                    id="lastName"
                    label="שם משפחה"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    error={errors.lastName}
                    handleChange={handleChange}
                />
                <InputField
                    id="dateOfBirth"
                    label="תאריך לידה"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    error={errors.dateOfBirth}
                    handleChange={handleChange}
                />
                <InputField
                    id="israeliID"
                    label="תעודת זהות"
                    type="text"
                    name="israeliID"
                    value={formData.israeliID}
                    error={errors.israeliID}
                    handleChange={handleChange}
                />
                <div className="form-group">
                    <label htmlFor="city">עיר:</label>
                    <select
                        id="city"
                        name="cityID"
                        value={formData.cityID}
                        onChange={handleChange}
                    >
                        {cities?.map((city, index) => (
                            <option key={index} value={city.cityID}>
                                {city.cityName}
                            </option>
                        ))}
                    </select>
                    {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <button type="submit" className="submit-button">שלח</button>
                <BtnNavigate
                    text='לרשימה המלאה'
                    url={ROUTES.USER_LIST}
                />
            </form>
        </div>
    );
};

export default FormStudent;
