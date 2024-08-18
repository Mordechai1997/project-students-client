import React, { createContext, useState, ReactNode } from 'react';
import { IStudent } from '../types/student';
import { ICity } from '../types/city';

interface FormContextType {
    listStudent: IStudent[] | undefined;
    addStudent: (data: IStudent) => void;
    setStudent: (data: IStudent[]) => void;
    listCity: ICity[] | undefined;
    setCity: (data: ICity[]) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [listStudent, setListStudent] = useState<IStudent[] | undefined>(undefined);
    const [listCity, setListCity] = useState<ICity[] | undefined>(undefined);

    const addStudent = (data: IStudent) => {
        setListStudent(prevData => prevData ? [...prevData, data] : [data]);
    };
    const setStudent = (data: IStudent[]) => {
        setListStudent(data);
    };
    const setCity = (data: ICity[]) => {
        setListCity(data);
    };

    return (
        <FormContext.Provider value={{ listStudent, addStudent, listCity, setCity, setStudent }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = React.useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
