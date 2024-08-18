import { IErrors } from '../types/errors';
import { IStudent } from '../types/student';



export const validateForm = (formData: IStudent): { valid: boolean; errors: IErrors } => {
    let valid = true;
    let errors: IErrors = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        israeliID: '',
        city: ''
    };

    if (!formData.firstName) {
        errors.firstName = 'שם פרטי הוא שדה חובה';
        valid = false;
    }
    if (!formData.lastName) {
        errors.lastName = 'שם משפחה הוא שדה חובה';
        valid = false;
    }
    if (!formData.dateOfBirth) {
        errors.dateOfBirth = 'תאריך לידה הוא שדה חובה';
        valid = false;
    }
    if (!formData.israeliID) {
        errors.israeliID = 'תעודת זהות היא שדה חובה';
        valid = false;
    } else if (!/^\d+$/.test(formData.israeliID)) {
        errors.israeliID = 'תעודת זהות יכולה להכיל רק מספרים';
        valid = false;
    } else if (formData.israeliID.length < 9 || formData.israeliID.length > 9) {
        errors.israeliID = 'תעודת זהות צריכה להכיל 9 ספרות';
        valid = false;
    }
    if (!formData.cityID) {
        errors.city = 'עיר היא שדה חובה';
        valid = false;
    }

    return { valid, errors };
};
