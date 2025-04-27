import '../styles/ReservationEdit.css';
import { reservationCookieName } from './Movies';
import { useNavigate } from 'react-router-dom';
import {getCookie} from '../Utilities/cookieUtils';
import { useEffect, useState} from 'react';
function ReservationEdit() {
    const navigate = useNavigate();
    const [cookieContent, setCookieContent] = useState([]);
    const decodedCookieContent = decodeURIComponent(getCookie(reservationCookieName));
    const [title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds] = decodedCookieContent.split(';');
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    useEffect(() => {
        setCookieContent([title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds.split('-')]);
    }, [title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds]);
    useEffect(() => {
        const reservationCookie = getCookie(reservationCookieName);
        const decodedCookieContent = decodeURIComponent(reservationCookie);
        const regex = /^([^;]+;){2}([1-9]\d*);[^;]+;(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)(?:;.*)?$/;
        if (!reservationCookie || !regex.test(decodedCookieContent)) {
            navigate('/');
        }
    }, [navigate]);
    const toggleDropdown = () => {
        setIsDropdownActive(!isDropdownActive);
    };
    return (
        <div className="reservation-edit">
            {
                cookieContent[5]?.length > 1 ? (
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
                    new Date(cookieContent[4]).toLocaleDateString('en-GB').replace(/\//g, '-')
                }
            </h1>
            <div className="reservation-edit-space-1"></div>
            {
                cookieContent[5]?.toString().split(',').map((seatId,index) => (
                    <div className="box" id="reservation-edit-ticket-list-item" key={index}>
                        <div className="reservation-edit-ticket-list-item-header">
                            Row: {Math.floor(seatId / 16) + 1 + " | "}
                            Seat: {(seatId % 16) + 1}
                        </div>
                        <div className="reservation-edit-space-3"></div>
                        <div className="reservation-edit-ticket-list-item-content">
                            Type:
                            <div className={`dropdown ${isDropdownActive ? 'is-active' : ''}`}>
                                <div className="dropdown-trigger">
                                    <button className="button" id="reservation-edit-ticket-list-item-content-dropdown-button" onClick={toggleDropdown}>
                                        <span className="reservation-edit-ticket-list-item-content-dropdown-button-label">sdf</span>
                                        <i className="fas fa-angle-down"></i>
                                    </button>
                                </div>
                                <div className="dropdown-menu">
                                    <div className="dropdown-content">
                                        <button className="dropdown-item">ljkhkljh</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="reservation-edit-ticket-list-item-content">
                            Price:
                        </div>
                    </div>
                ))
            }
            <div className="reservation-edit-space-2"></div>
        </div>
    );
}

export default ReservationEdit;