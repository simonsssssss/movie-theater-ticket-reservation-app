import '../styles/UserInfo.css';
import { reservationCookieName } from './Movies';
import {deleteCookie, getCookie} from "../Utilities/cookieUtils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
function UserInfo() {
    const navigate = useNavigate();
    const [cookieContent, setCookieContent] = useState([]);
    const decodedCookieContent = decodeURIComponent(getCookie(reservationCookieName));
    const [title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds, ticketTypes] = decodedCookieContent?.split(';');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [errors, setErrors] = useState({});
    useEffect(() => {
        setCookieContent([title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds?.split('-'), ticketTypes?.split('-')]);
    }, [title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds, ticketTypes]);
    useEffect(() => {
        const reservationCookie = getCookie(reservationCookieName);
        const decodedCookieContent = decodeURIComponent(reservationCookie);
        const regex = /^[^;]*;[^;]*;[1-9]\d*;[^;]*;\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z;(?:\d{1,3}-)*\d{1,3};(?:[a-zA-Z]+-)*[a-zA-Z]+.*$/;
        if (!reservationCookie || !regex.test(decodedCookieContent)) {
            navigate('/');
        }
    }, [navigate]);
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if(!email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if(!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if(!confirmEmail.trim()) {
            newErrors.confirmEmail = 'Please confirm your email';
        }
        else if(email !== confirmEmail) {
            newErrors.confirmEmail = "Email addresses do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Checks if the newErrors object has any own enumerable properties. If it returns true, it means the object is empty - there are no keys (i.e., no properties)
    };
    const handleUserInformationSubmission = () => {
        if(validateForm()) {
            /*deleteCookie(reservationCookieName);
            navigate('/confirmation');*/
        }
    };
    return (
        <div className="user-information">
            <h1 className="title is-2" id="user-information-h1-title-large">Enter your information</h1>
            <div className="user-information-space-1"></div>
            <div className="field" id="user-information-field">
                <label className="label" id="user-information-field-label" htmlFor="user-information-field-full-name-input">Full Name</label>
                <input
                    className={`input ${errors.fullName ? 'is-danger' : ''}`}
                    id="user-information-field-full-name-input"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={(e) => setFullName(e.target.value)}>
                </input>
                {errors.fullName && <p className="help is-danger is-size-6">{errors.fullName}</p>}
            </div>
            <div className="field" id="user-information-field">
                <label className="label" id="user-information-field-label" htmlFor="user-information-field-email-input">Email</label>
                <input
                    className={`input ${errors.email ? 'is-danger' : ''}`}
                    id="user-information-field-email-input"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}>
                </input>
                {errors.email && <p className="help is-danger is-size-6">{errors.email}</p>}
            </div>
            <div className="field" id="user-information-field">
                <label className="label" id="user-information-field-label" htmlFor="user-information-field-confirm-email-input">Confirm Email</label>
                <input
                    className={`input ${errors.confirmEmail ? 'is-danger' : ''}`}
                    id="user-information-field-confirm-email-input"
                    type="email"
                    placeholder="Re-enter your email"
                    onChange={(e) => setConfirmEmail(e.target.value)}>
                </input>
                {errors.confirmEmail && <p className="help is-danger is-size-6">{errors.confirmEmail}</p>}
            </div>
            <div className="button" id="user-information-submit-button" onClick={handleUserInformationSubmission}>
                <i className="fa-solid fa-check"></i>
                <span className="user-information-submit-button-label">Save</span>
            </div>
            <div className="user-information-space-2"></div>
        </div>
    );
}

export default UserInfo;