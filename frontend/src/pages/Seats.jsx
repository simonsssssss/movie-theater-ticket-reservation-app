import '../styles/Seats.css';
import { reservationCookieName } from './Movies';
import { useNavigate } from 'react-router-dom';
import {deleteCookie, getCookie, setCookie} from '../Utilities/cookieUtils';
import { useEffect, useState} from 'react';
function Seats() {
    const [seatIsSelected, setSeatIsSelected] = useState(Array(192).fill(false));
    const [decodedCookieValue, setDecodedCookieValue] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const reservationCookie = getCookie(reservationCookieName);
        const cookieString = decodeURIComponent(reservationCookie);
        const regex = /^[^;]+;[^;]+;\d+;[^;]+;\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z;\d+.*$/;
        if (!reservationCookie || !regex.test(cookieString)) {
            navigate('/');
        }
    }, [navigate]);
    const decodedString = decodeURIComponent(getCookie(reservationCookieName));
    const [title, genre, durationInMinutes, format, screeningTime, auditoriumNumber] = decodedString?.split(';');
    useEffect(() => {
        setDecodedCookieValue([title, genre, durationInMinutes, format, screeningTime, auditoriumNumber]);
    }, [title, genre, durationInMinutes, format, screeningTime, auditoriumNumber]);
    const handleSeatSelection = (seatId) => {
        setSeatIsSelected((prevSelections) =>
            prevSelections.map((item, index) =>
                index === seatId ? !item : item
            )
        );
    };
    const getTruthyIndices = (arr) => {
        return arr.reduce((indices, value, index) => {
            if (value) {
                indices.push(index);
            }
            return indices;
        }, []);
    };
    const handleClickForSavingSeats = () => {
        deleteCookie(reservationCookieName);
        let selectedSeatsIds = "";
        const truthyIndices = getTruthyIndices(seatIsSelected);
        truthyIndices.forEach((truthyIndex,index) => {
            if(index !== 0) {
                selectedSeatsIds += "-";
            }
            selectedSeatsIds += truthyIndex;
        });
        const cookieContent = decodedCookieValue[0] + ";" + decodedCookieValue[1] + ";" + decodedCookieValue[2] + ";" + decodedCookieValue[3] + ";" + decodedCookieValue[4] + ";" + decodedCookieValue[5] + ";" + selectedSeatsIds;
        setCookie(reservationCookieName, cookieContent);
        navigate('/reservation-edit');
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
                    new Date(decodedCookieValue[4]).toLocaleDateString('en-GB').replace(/\//g, '-') + ' | Auditorium: ' +
                    decodedCookieValue[5]
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
                                        onClick={() => handleSeatSelection(rowIndex * 16 + seatIndex)}
                                        style={{
                                            backgroundColor: seatIsSelected[rowIndex * 16 + seatIndex] ? 'green' : ''
                                        }}
                                        key={seatIndex}>
                                    </div>
                                ))
                            }
                            <div className="seats-seats-selection-screen-row-alley"></div>
                            {
                                Array.from({ length: 8 }, (_, seatIndex) => (
                                    <div
                                        className="seats-seats-selection-screen-row-seat"
                                        onClick={() => handleSeatSelection(rowIndex * 16 + seatIndex + 8)}
                                        style={{
                                            backgroundColor: seatIsSelected[rowIndex * 16 + seatIndex + 8] ? 'green' : ''
                                        }}
                                        key={seatIndex}>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <div className="title is-5" id="seats-selected-seats-number">The number of selected seats: { seatIsSelected.filter(Boolean).length }</div>
                {
                    seatIsSelected.filter(Boolean).length > 0 ? (
                        <div className="button" id="seats-submit-selected-seats-button" onClick={handleClickForSavingSeats}>
                            <i className="fa-solid fa-check"></i>
                            <span className="seats-submit-selected-seats-button-label">Save</span>
                        </div>
                    ) : null
                }
                <div className="seats-space"></div>
            </div>
        </div>
    );
}

export default Seats;