const express = require('express');
const cors = require('cors');
const os = require('os');
const pool = require('./database/db');
const { encrypt } = require('./utils/encryption');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/movies', async (req, res) => {
    const { screening_time } = req.body;
    try {
        if(!screening_time || !screening_time.trim()) {
            res.status(400).json({error: 'Invalid data provided'});
        }
        else {
            const allMovies = await pool.query(
                'SELECT * FROM movies\n' +
                'WHERE EXISTS (\n' +
                '   SELECT 1\n' +
                '   FROM unnest(movies.screening_time) AS ts\n' +
                '   WHERE ts::date = $1\n' +
                ');', [screening_time]);
            res.json(allMovies.rows);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/getTicketReservationById', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM ticket_reservations WHERE id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/addTicketReservation', async (req, res) => {
    const { fullName, email, movieTitle, format, screeningTime, auditoriumNumber, seatIds, ticketTypes } = req.body;
    try {
        const encryptedFullName = encrypt(fullName);
        const encryptedEmail = encrypt(email);
        const newTicketReservation = await pool.query(
            'INSERT INTO ticket_reservations (full_name, email, movie_title, format, screening_time, auditorium_number, seat_ids, ticket_types) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            [encryptedFullName, encryptedEmail, movieTitle, format, screeningTime, auditoriumNumber, seatIds, ticketTypes]
        );
        res.status(201).json(newTicketReservation.rows[0]); // Represents the first and presumably only row of the result set returned from the query
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    const hostname = os.hostname();
    console.log(`Server is running. Port: ${port}. Host: ${hostname}.`);
});