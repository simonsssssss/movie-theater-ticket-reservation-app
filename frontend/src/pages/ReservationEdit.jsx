import '../styles/ReservationEdit.css';
import { reservationCookieName } from './Movies';
import { useNavigate } from 'react-router-dom';
import {deleteCookie, getCookie, setCookie} from '../Utilities/cookieUtils';
import { useEffect, useState} from 'react';
function ReservationEdit() {
    const navigate = useNavigate();
    const [cookieContent, setCookieContent] = useState([]);
    const decodedCookieContent = decodeURIComponent(getCookie(reservationCookieName));
    const [title, genre, durationInMinutes, format, screeningTime, selectedSeatsIds] = decodedCookieContent.split(';');
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
        </div>
    );
}

export default ReservationEdit;