import '../styles/Seats.css';
import { reservationCookieName } from './Movies';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Utilities/cookieUtils';
import { useEffect, useState, useRef } from 'react';

function Seats() {
    const [seatIsSelected, setSeatIsSelected] = useState(Array(192).fill(false));
    const seatsRef = useRef([]);
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
    const handleSeatSelection = (seatId) => {
        setSeatIsSelected((prevSelections) =>
            prevSelections.map((item, index) =>
                index === seatId ? !item : item
            )
        );
    };
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
            <div className="seats-seats-selection">
                <div className="seats-seats-selection-screen"></div>
                <div className="seats-seats-selection-screen-glow"></div>
                {
                    Array.from({ length: 12 }, (_, rowIndex) => (
                        <div className="seats-seats-selection-screen-row" key={rowIndex}>
                            <div className="seats-seats-selection-screen-row-number">{rowIndex + 1}</div>
                            {
                                Array.from({ length: 8 }, (_, seatIndex) => (
                                    <div
                                        className="seats-seats-selection-screen-row-seat"
                                        ref={el => seatsRef.current[rowIndex * 16 + seatIndex] = rowIndex * 16 + seatIndex}
                                        onClick={() => handleSeatSelection(rowIndex * 16 + seatIndex)}
                                        key={seatIndex}>
                                    </div>
                                ))
                            }
                            <div className="seats-seats-selection-screen-row-alley"></div>
                            {
                                Array.from({ length: 8 }, (_, seatIndex) => (
                                    <div
                                        className="seats-seats-selection-screen-row-seat"
                                        ref={el => seatsRef.current[rowIndex * 16 + seatIndex + 8] = rowIndex * 16 + seatIndex + 8}
                                        onClick={() => handleSeatSelection(rowIndex * 16 + seatIndex + 8)}
                                        key={seatIndex}>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Seats;