import '../styles/ReservationEdit.css';
import { reservationCookieName } from './Movies';
import { useNavigate } from 'react-router-dom';
import { deleteCookie, getCookie, setCookie } from '../Utilities/cookieUtils';
import { useEffect, useState } from 'react';
function ReservationEdit() {
    const navigate = useNavigate();
    const [cookieContent, setCookieContent] = useState([]);
    const decodedCookieContent = decodeURIComponent(getCookie(reservationCookieName));
    const [title, genre, durationInMinutes, format, screeningTime, auditoriumNumber, selectedSeatsIds] = decodedCookieContent?.split(';');
    const [selectedDropdownOption, setSelectedDropdownOption] = useState(Array(cookieContent[6]?.length || 0).fill("standard"));
    useEffect(() => {
        setCookieContent([title, genre, durationInMinutes, format, screeningTime, auditoriumNumber, selectedSeatsIds?.split('-')]);
    }, [title, genre, durationInMinutes, format, screeningTime, auditoriumNumber, selectedSeatsIds]);
    useEffect(() => {
        const reservationCookie = getCookie(reservationCookieName);
        const decodedCookieContent = decodeURIComponent(reservationCookie);
        const regex = /^[^;]+;[^;]+;\d+;[^;]+;\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z;\d+;(?:\d{1,3}-)*\d{1,3}.*$/;
        if (!reservationCookie || !regex.test(decodedCookieContent)) {
            navigate('/');
        }
    }, [navigate]);
    useEffect(() => {
        if (cookieContent[6] && cookieContent[6].length > 0) {
            setSelectedDropdownOption(Array(cookieContent[6].length).fill("standard"));
        }
    }, [cookieContent]);
    const handleDropdownOptionSelection = (event, index) => {
        const newSelections = [...selectedDropdownOption];
        newSelections[index] = event.target.value;
        setSelectedDropdownOption(newSelections);
    };
    const handleTicketsSubmission = () => {
        deleteCookie(reservationCookieName);
        const ticketTypes = selectedDropdownOption?.join('-');
        const newCookieContent = cookieContent[0] + ";" + cookieContent[1] + ";" + cookieContent[2] + ";" + cookieContent[3] + ";" + cookieContent[4] + ";" + cookieContent[5] + ";" + cookieContent[6]?.join('-') + ";" + ticketTypes;
        setCookie(reservationCookieName, newCookieContent);
        navigate('/user-information');
    };
    return (
        <div className="reservation-edit">
            {
                cookieContent[6]?.length > 1 ? (
                    <h1 className="title is-2" id="reservation-edit-h1-title-large">Select ticket types</h1>
                ) : (
                    <h1 className="title is-2" id="reservation-edit-h1-title-large">Select ticket type</h1>
                )
            }
            <h1 className="title is-5" id="reservation-edit-h1-title-small">
                {
                    cookieContent[0] + ' | ' + cookieContent[1] + ' | ' +
                    cookieContent[2] + ' min | ' + cookieContent[3] + ' | ' +
                    new Date(cookieContent[4]).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    }) + ' ' +
                    new Date(cookieContent[4]).toLocaleDateString('en-GB').replace(/\//g, '-') + ' | Auditorium: ' +
                    cookieContent[5]
                }
            </h1>
            <div className="reservation-edit-space-1"></div>
            {
                cookieContent[6]?.toString()?.split(',').map((seatId,index) => (
                    <div className="box" id="reservation-edit-ticket-list-item" key={index}>
                        <div className="reservation-edit-ticket-list-item-header">
                            Row: {Math.floor(seatId / 16) + 1 + " | "}
                            Seat: {(seatId % 16) + 1}
                        </div>
                        <div className="reservation-edit-space-3"></div>
                        <div className="reservation-edit-ticket-list-item-content">
                            <select className="reservation-edit-ticket-list-item-content-dropdown" onChange={(e) => handleDropdownOptionSelection(e, index)}>
                                <option className="reservation-edit-ticket-list-item-content-dropdown-option" value="standard">Standard | {"\u00A3"}10</option>
                                <option className="reservation-edit-ticket-list-item-content-dropdown-option" value="child">Child | {"\u00A3"}5</option>
                                <option className="reservation-edit-ticket-list-item-content-dropdown-option" value="student">Student | {"\u00A3"}8</option>
                                <option className="reservation-edit-ticket-list-item-content-dropdown-option" value="senior">Senior | {"\u00A3"}7</option>
                            </select>
                        </div>
                    </div>
                ))
            }
            <div className="button" id="reservation-edit-submit-tickets-button" onClick={handleTicketsSubmission}>
                <i className="fa-solid fa-check"></i>
                <span className="reservation-edit-submit-tickets-button-label">Save</span>
            </div>
            <div className="reservation-edit-space-2"></div>
        </div>
    );
}

export default ReservationEdit;