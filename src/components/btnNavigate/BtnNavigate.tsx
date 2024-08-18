import React from 'react';
import { useNavigate } from 'react-router-dom';
import './btnNavigate.css';

interface IBtnNavigateProps {
    url: string;
    text: string;
}

const BtnNavigate: React.FC<IBtnNavigateProps> = ({ url, text }) => {
    const navigate = useNavigate();

    return (
        <div className='container-navigate-button'>
            <span className="back-button" onClick={() => navigate(url)}> {text}</span>
            ⬅️
        </div>
    );
};

export default BtnNavigate;
