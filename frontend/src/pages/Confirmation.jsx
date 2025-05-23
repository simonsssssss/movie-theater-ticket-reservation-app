import '../styles/Confirmation.css';
import { reservationCookieName } from './Movies';
import { useEffect, useState } from "react";
import { getCookie } from "../Utilities/cookieUtils";
import { useNavigate } from "react-router-dom";
function Confirmation() {
    const navigate = useNavigate();
    const ticketReservationId = decodeURIComponent(getCookie(reservationCookieName));
    const [reservationData, setReservationData] = useState(null);
    useEffect(() => {
        const reservationCookie = getCookie(reservationCookieName);
        const decodedCookieContent = decodeURIComponent(reservationCookie);
        const regex = /^(0|[1-9][0-9]*)$/;
        if (!reservationCookie || !regex.test(decodedCookieContent)) {
            navigate('/');
            return; // Stops executing further "useEffect" code
        }
        const fetchReservation = async () => {
            try {
                const response = await fetch('http://localhost:4000/getTicketReservationById', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: ticketReservationId }),
                });
                if(response.ok) {
                    const data = await response.json();
                    setReservationData(data);
                }
                else {
                    navigate('/');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                navigate('/');
            }
        };
        fetchReservation();
    }, [navigate, ticketReservationId]);
    return (
        <div className="confirmation">
            <h1 className="title is-2" id="confirmation-h1-title-large">Your Ticket Reservation Is Confirmed</h1>
            <h1 className="title is-5" id="confirmation-h1-title-small">
                Reservations must be collected in person at least 30 minutes before the film starts.
                Unclaimed reservations may be cancelled and the seats released for sale to other customers.
            </h1>
            <div className="confirmation-space-1"></div>
            <div className="confirmation-row">
                <div className="confirmation-label">Title</div>
                <div className="confirmation-value">{reservationData?.movie_title}</div>
            </div>
            <div className="confirmation-row">
                <div className="confirmation-label">Format</div>
                <div className="confirmation-value">{reservationData?.format}</div>
            </div>
            <div className="confirmation-row">
                <div className="confirmation-label">Time</div>
                <div className="confirmation-value">
                    {
                        new Date(reservationData?.screening_time).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }) + ' ' +
                        new Date(reservationData?.screening_time).toLocaleDateString('en-GB').replace(/\//g, '-')
                    }
                </div>
            </div>
            <div className="confirmation-row">
                <div className="confirmation-label">Auditorium</div>
                <div className="confirmation-value">{reservationData?.auditorium_number}</div>
            </div>
            <div className="confirmation-row">
                <div className="confirmation-label">Seats</div>
                    <div className="confirmation-value">
                        {
                            reservationData?.seat_ids?.map((seatId, index) => (
                                <div className="confirmation-value-item" key={index}>
                                    Row: {Math.floor(seatId / 16) + 1 + " | "}
                                    Seat: {(seatId % 16) + 1}
                                </div>
                            ))
                        }
                    </div>
            </div>
            <div className="confirmation-row">
                <div className="confirmation-label">Types</div>
                <div className="confirmation-value">{reservationData?.ticket_types?.join(', ')}</div>
            </div>
            <div className="confirmation-space-2"></div>
        </div>
    );
}

export default Confirmation;