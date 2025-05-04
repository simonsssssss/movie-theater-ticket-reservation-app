import '../styles/UserInfo.css';
import { reservationCookieName } from './Movies';
import { deleteCookie, getCookie, setCookie } from "../Utilities/cookieUtils";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
function UserInfo() {
    const navigate = useNavigate();
    const decodedCookieContent = decodeURIComponent(getCookie(reservationCookieName));
    const [title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds, ticketTypes] = decodedCookieContent?.split(';');
    useEffect(() => {
        const reservationCookie = getCookie(reservationCookieName);
        const decodedCookieContent = decodeURIComponent(reservationCookie);
        const regex = /^[^;]*;[^;]*;[1-9]\d*;[^;]*;\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z;(?:\d{1,3}-)*\d{1,3};(?:[a-zA-Z]+-)*[a-zA-Z]+.*$/;
        if (!reservationCookie || !regex.test(decodedCookieContent)) {
            navigate('/');
        }
    }, [navigate]);
    const handleUserInformationSubmission = () => {
        // form validation !!!
        /*deleteCookie(reservationCookieName);
        const newCookieContent = null;
        setCookie(reservationCookieName, newCookieContent);
        navigate('/user-information');*/
    };
    return (
        <div className="user-information">
            <h1 className="title is-2" id="user-information-h1-title-large">Enter your information</h1>
            <div className="user-information-space-1"></div>
            <div className="field" id="user-information-field">
                <label className="label" id="user-information-field-label">Full Name</label>
                <input className="input" id="user-information-field-input" type="text" placeholder="Enter your full name" required></input>
            </div>
            <div className="field" id="user-information-field">
                <label className="label" id="user-information-field-label">Email</label>
                <input className="input" id="user-information-field-input" type="email" placeholder="Enter your email" required></input>
            </div>
            <div className="field" id="user-information-field">
                <label className="label" id="user-information-field-label">Confirm Email</label>
                <input className="input" id="user-information-field-input" type="email" placeholder="Re-enter your email" required></input>
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