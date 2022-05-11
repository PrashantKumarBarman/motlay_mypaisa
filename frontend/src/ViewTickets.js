import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ViewTickets() {
    let [date, setDate] = useState('');
    let [bookings, setBookings] = useState([]);

    const handleDateChange = async (date) => {
        let d = date.toISOString().split('T')[0];
        setDate(d);
        let bookings = await fetch(`/booking/${d}/all`);
        let result = await bookings.json();
        setBookings(result);
    }

    const updateStatus = async function(bookingId, status) {
        await fetch(`/booking/${bookingId}/status/${status}`,
        {
            method: 'PUT'
        });
        let temp = bookings.map((booking) => {
            if(booking.id === bookingId) {
                return { ...booking, status: status };
            }
            else {
                return booking;
            }
        });
        setBookings(temp);
    }

    return (
        <>
        <Grid container>
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
        </Grid>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Booking id</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Seats</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((booking) => {
                        let seats = booking.seats.map((seat) => {
                            return seat.seatNo;
                        }).toString();
                        return (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.id}</TableCell>
                                <TableCell>{booking.date}</TableCell>
                                <TableCell>{booking.mobile}</TableCell>
                                <TableCell>{seats}</TableCell>
                                <TableCell>
                                    {booking.status === 'booked' ? (
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={booking.status}
                                            label="Age"
                                            onChange={(e) => { updateStatus(booking.id, e.target.value); }}
                                            >
                                            <MenuItem value={'arrived'}>Arrived</MenuItem>
                                            <MenuItem value={'cancelled'}>Cancel</MenuItem>
                                            </Select>
                                        </FormControl>
                                    ): null}
                                    {booking.status === 'arrived' ? (
                                        <Button variant='contained' color='success' disabled>Arrived</Button>
                                    ) : null}

                                    {booking.status === 'cancelled' ? (
                                        <Button variant='contained' color='error' disabled>Cancelled</Button>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}