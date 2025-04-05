import '../styles/Seats.css';
import { reservationCookieName } from './Movies';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Utilities/cookieUtils';
import { useEffect, useState } from 'react';

function Seats() {
    const [decodedCookieValue, setDecodedCookieValue] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const reservationCookie = getCookie(reservationCookieName);
        if (!reservationCookie) {
            navigate('/');
        }
    }, [navigate]);
    const decodedString = decodeURIComponent(getCookie(reservationCookieName));
    const [title, genre, durationInMinutes, format, screeningTime] = decodedString.split(';');
    useEffect(() => {
        setDecodedCookieValue([title, genre, durationInMinutes, format, screeningTime])
    }, [title, genre, durationInMinutes, format, screeningTime]);
    return (
        <div className="seats">
            <h1 className="title is-2" id="seats-h1-title-large">Select seats</h1>
            <h1 className="title is-5" id="seats-h1-title-small">
                {
                    decodedCookieValue[0] + ' | ' + decodedCookieValue[1] + ' | ' +
                    decodedCookieValue[2] + ' min | ' + decodedCookieValue[3] + ' | ' +
                    new Date(decodedCookieValue[4]).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    }) + ' ' +
                    new Date(decodedCookieValue[4]).toLocaleDateString('en-GB').replace(/\//g, '-')
                }
            </h1>
        </div>
    );
}

export default Seats;