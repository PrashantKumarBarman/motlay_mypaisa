import Seats from "./Seats";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import PopupDialog from './PopupDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BookTicket() {
    let [date, setDate] = useState('');
    let [mobile, setMobile] = useState('');
    let [seats, setSeats] = useState([]);
    let [popupMessage, setPopupMessage] = useState(null);
    let [seatsMap, setSeatsMap] = useState({});
    let [selfBookedSeats, setSelfBookedSeats] = useState([]);
    let [bookings, setBookings] = useState([]);

    useEffect(() => {
        updateSelfBookedSeats();
    }, [bookings]);

    useEffect(() => {
        updateSelfBookedSeats();
    }, [mobile]);

    function updateSelfBookedSeats() {
        let selfBookedSeats = [];
        bookings.forEach((booking) => {
            if(booking.mobile === mobile) {
                let t = booking.seats.map((seat) => {
                    return seat.seatNo;
                })
                selfBookedSeats = selfBookedSeats.concat(t);
            }
        });
        setSelfBookedSeats(selfBookedSeats);
    }

    function handleSelection(seatNo) {
        if(!seats.includes(seatNo)) {
            if(seats.length === 6) {
                setPopupMessage({ text: 'More than 6 seats not allowed', type: 'error' });
                return;
            }
            else if(((selfBookedSeats.length + seats.length + 1) > 6)) {
                setPopupMessage({ text: 'More than 6 seats not allowed per mobile number in a day', type: 'error' });
                return;
            }
            else if(!mobile) {
                setPopupMessage({ text: 'No mobile number given', type: 'error' });
                return;
            }
            else if(!date) {
                setPopupMessage({ text: 'No date selected', type: 'error' });
                return;
            }
            let temp = [...seats, seatNo];
            setSeats(temp);
        }
        else {
            let temp = seats.filter((s) => {
                return s !== seatNo;
            });
            setSeats(temp);
        }
    }

    const handleDateChange = async (date) => {
        let d = date.toISOString().split('T')[0];
        setDate(d);
        let bookings = await fetch(`/booking/${d}`);
        let result = await bookings.json();
        let seatsMap = {};
        result.forEach((booking) => {
            booking.seats.forEach((seat) => {
                seatsMap[seat.seatNo] = { ...seat, date: booking.date, mobile: booking.mobile };
            });
        });
        setSeats([]);
        setBookings(result);
        setSeatsMap(seatsMap);
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if(seats.length === 0) {
                setPopupMessage({ text: 'No seats selected', type: 'error' });
                return;
            }
            if(seats.length > 6) {
                setPopupMessage({ text: 'Maximum 6 seats allowed', type: 'error' });
                return;
            }
            if(!date) {
                setPopupMessage({ text: 'No date selected', type: 'error' });
                return;
            }
            let data = {
                date: date,
                mobile: mobile,
                seats: seats
            };
            let result = await fetch('/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if(result.status !== 200) {
                let text = await result.text();
                setPopupMessage({ text: text, type: 'error' });
            }
            else {
                let jsonResponse = await result.json();
                let message = (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Booking id</strong></TableCell>
                                    <TableCell>{jsonResponse.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Date</strong></TableCell>
                                    <TableCell>{date}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Mobile</strong></TableCell>
                                    <TableCell>{mobile}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Booking id</strong></TableCell>
                                    <TableCell>{seats.toString()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
                setPopupMessage({ title: "Tickets booked successfully", text: message });
                setSeats([]);
                setBookings([]);
                setSeatsMap({});
                setSelfBookedSeats([]);
                setMobile('');
                setDate('');
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <>
        <form style={{ height: '91%' }} onSubmit={handleSubmit}>
        <Grid container>
            <Grid item md={4}>
                <TextField label="Enter mobile number" type="number" value={mobile} onChange={ (e) => { setMobile(e.target.value); } } required />
            </Grid>
            <Grid item md={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select date"
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="dd-mm-yyyy"
                        required
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item md={4}>
                <Button variant='contained' type="submit">Submit</Button>
            </Grid>
        </Grid>
        <Seats col={2} row={15} handleSelection={handleSelection} seats={seats} seatsMap={seatsMap} selfBookedSeats={selfBookedSeats} />
        </form>
        <PopupDialog message = {popupMessage} />
        </>
    );
}